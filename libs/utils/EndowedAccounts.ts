import { errMsgFilter } from "@/libs/utils/errorHandling";
import { Api } from "@cennznet/api";
import { Keyring } from "@polkadot/keyring";

class EndowedAccount {
	private _keyPair: any;
	private _api: Api;
	private _nonce: number;
	private _ongoingTx: {};
	private _resetNonce: any;
	private TIMEOUT: number;

	constructor(api, seed, keyring) {
		this._keyPair = keyring.addFromUri(seed);

		this._api = api;
		this._nonce = 0;

		this._resetNonce = null;
		this.TIMEOUT = 1000 * 60;
		this._ongoingTx = {};
	}

	async init() {
		const accountNextNonce = await this._api.rpc.system.accountNextIndex(
			this._keyPair.address
		);
		this._nonce = accountNextNonce.toNumber();
		console.info(
			`[${this.getDate().toISOString()}] INFO: init nonce ${
				this._keyPair.address
			} ${this._nonce}`
		);
	}

	getDate() {
		return new Date();
	}

	async nextNonce() {
		await this._resetNonce; // await any ongoing reset nonce action
		const nonce = this._nonce;
		this._nonce = nonce + 1;
		return nonce;
	}

	async resetNonce() {
		if (this._resetNonce) {
			// already in resetting
			return this._resetNonce;
		}
		this._resetNonce = (async () => {
			console.info(
				`[${this.getDate().toISOString()}] INFO: reset nonce ${
					this._keyPair.address
				}`
			);
			// wait for ongoing tx to be finished
			await Promise.all(Object.values(this._ongoingTx)).catch(() => {});
			// update nonce
			await this.init();
			this._resetNonce = null;
		})();
	}

	async send(tx, retry = true) {
		console.info(
			`[${this.getDate().toISOString()}] INFO: send from ${
				this._keyPair.address
			} ${this._nonce}`
		);
		await this._resetNonce; // await any ongoing reset nonce action
		console.info(
			`[${this.getDate().toISOString()}] INFO: done reset nonce ${
				this._keyPair.address
			} ${this._nonce}`
		);

		let timeoutID;
		return new Promise(async (resolve, reject) => {
			const signedTx = tx.sign(this._keyPair, await this.nextNonce());
			const hash = signedTx.hash;

			// first try promise, this promise will resolve after the first try;
			let firstTryPromiseResolve;
			this._ongoingTx[hash] = new Promise((resolve) => {
				firstTryPromiseResolve = resolve;
			}).then(() => {
				if (this._ongoingTx && this._ongoingTx[hash]) {
					delete this._ongoingTx[hash];
				}
			});

			timeoutID = setTimeout(() => {
				clearTimeout(timeoutID);
				firstTryPromiseResolve();
				console.warn("Send Timeout");
				reject(new Error("Send Timeout"));
			}, this.TIMEOUT);

			signedTx
				.send(async ({ events = [], status }) => {
					console.info(
						`[${this.getDate().toISOString()}] INFO: Status ${
							this._keyPair.address
						} ${hash.toString()} ${status.toString()}`
					);
					if (status.isFinalized) {
						firstTryPromiseResolve();
						events = JSON.parse(JSON.stringify(events));
						for (const event of events) {
							if (
								event.phase &&
								event.phase.applyExtrinsic &&
								event.event.index === "0x0000"
							) {
								resolve(hash);
							}
						}
						reject(
							new Error(
								`Send tx failed. Sender address: ${this._keyPair.address}`
							)
						);
					} else if (status.isInvalid || status.toString() === "Future") {
						firstTryPromiseResolve();
						if (!retry) {
							if (status.toString() === "Future") {
								reject(
									new Error(
										`Nonce is too high when sending asset, transaction is now in the future pool.`
									)
								);
							} else {
								reject(new Error("Send tx failed. Status: ", status.toJSON()));
							}
						} else {
							console.warn(
								`[${this.getDate().toISOString()}] WARNING: Send tx failed, retry. Reason: Nonce is too high ${
									this._keyPair.address
								} ${hash.toString()}`
							);
							firstTryPromiseResolve();
							await this.resetNonce();
							resolve(this.send(tx, false));
						}
					}
				})
				.catch(async (err) => {
					if (!retry) {
						firstTryPromiseResolve();
						reject(errMsgFilter(err, this._keyPair.address));
					} else {
						console.warn(
							`[${this.getDate().toISOString()}] WARNING: Send tx failed, retry. Reason: ${err} ${
								this._keyPair.address
							} ${hash.toString()}`
						);
						firstTryPromiseResolve();
						await this.resetNonce();
						resolve(this.send(tx, false));
					}
				});
		})
			.then((res) => {
				clearTimeout(timeoutID);
				return res;
			})
			.catch((err) => {
				clearTimeout(timeoutID);
				throw err;
			});
	}
}

export class EndowedAccounts {
	private _keyring: Keyring;
	private _accounts: any[];
	private _unavailableAccounts: any[];
	private _nextAccountIndex: number;
	private _api: any;
	private MAX_UNAVAILABLE: number;
	private MIN_AVAILABLE: number;
	_availableAccounts: any[];

	constructor(api, seeds) {
		this._keyring = new Keyring({ type: "sr25519" });
		this._accounts = [];
		this._availableAccounts = [];
		this._unavailableAccounts = [];
		this.MAX_UNAVAILABLE = 9;
		this.MIN_AVAILABLE = 4;
		seeds.map((seed) => {
			const account = new EndowedAccount(api, seed, this._keyring);
			this._accounts.push(account);
			this._availableAccounts.push(account);
		});
		this._nextAccountIndex = 0;
		this._api = api;
	}

	async init() {
		await Promise.all(this._accounts.map((a) => a.init()));
	}

	nextAccount() {
		if (this._availableAccounts.length === 0) {
			throw new Error("No available account");
		}
		return this._availableAccounts[
			this._nextAccountIndex++ % this._availableAccounts.length
		];
	}

	async send(tx, _account = undefined) {
		const account = _account || this.nextAccount();
		return account.send(tx).catch(async (err) => {
			// remove this account from available list
			if (
				err.message.includes("Invalid Transaction (3)") ||
				err.message.includes(
					"A transaction in your account with the same nonce is stuck in the pool"
				)
			) {
				// adding this check to avoid duplicate remove when there are lots of requests
				if (this.isIncludesAccount(account)) {
					this._unavailableAccounts.push(account);
					const accountId = account._keyPair.address;
					this._availableAccounts = this._availableAccounts.filter(
						(availableAccount) =>
							accountId !== availableAccount._keyPair.address
					);
					if (
						err.message.includes(
							"A transaction in your account with the same nonce is stuck in the pool"
						)
					) {
						console.info(
							`[${this.getDate().toISOString()}] INFO: Health check - Account ${accountId} is stuck in the pool and was removed from available accounts. ${
								this._availableAccounts.length
							} accounts available now.`
						);
					} else {
						console.info(
							`[${this.getDate().toISOString()}] INFO: Health check - Account ${accountId}: Invalid Transaction (3).`
						);
					}
				}
			}
			throw err;
		});
	}

	async health(sentryEvents$) {
		if (this._unavailableAccounts.length > this.MAX_UNAVAILABLE) {
			sentryEvents$.next({
				error: new Error(
					`${this._unavailableAccounts.length} accounts unavailable now. Please replace them`
				),
				transaction: "GET|/health",
			});
		}
		if (this._availableAccounts.length < this.MIN_AVAILABLE) {
			sentryEvents$.next({
				error: new Error(
					`Only ${this._availableAccounts.length} accounts available now. Please replace the unavailable accounts`
				),
				transaction: "GET|/health",
			});
		}

		if (this._availableAccounts.length === 0) {
			throw new Error("Health Check Failed");
		}
		return this._availableAccounts.length;
	}

	get api() {
		return this._api;
	}

	getDate() {
		return new Date();
	}

	// account: EndowedAccount
	isIncludesAccount(accountInput) {
		return this._availableAccounts.some(
			(account) => account._keyPair.address === accountInput._keyPair.address
		);
	}
}
