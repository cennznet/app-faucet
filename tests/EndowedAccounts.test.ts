import { EndowedAccounts } from "@/libs/utils";
import {
	ENDOWED_ACCOUNT_SEEDS,
	TRANSFER_AMOUNT,
	CENNZNET_NIKAU_API_URL,
} from "@/libs/constants";
import { Api } from "@cennznet/api";
import { Keyring } from "@polkadot/keyring";

describe("EndowedAccounts", () => {
	let endowedAccounts;
	let bob;
	let api;

	beforeAll(async () => {
		api = await Api.create({
			provider: CENNZNET_NIKAU_API_URL,
		});
		const keyring = new Keyring({ type: "sr25519" });
		ENDOWED_ACCOUNT_SEEDS.push("//TestAccountEmpty");
		endowedAccounts = new EndowedAccounts(api, ENDOWED_ACCOUNT_SEEDS);
		bob = keyring.addFromUri("//TestAccount");
	});

	afterAll(async () => {
		await api.disconnect();
	});

	describe("send()", () => {
		it("should be able to send funds to given account", async () => {
			const assetId = 16001;
			const assetBalanceBobBefore = await api.query.genericAsset.freeBalance(
				assetId,
				bob.address
			);
			await endowedAccounts.send(
				endowedAccounts.api.tx.genericAsset.transfer(
					assetId,
					bob.address,
					TRANSFER_AMOUNT
				)
			);
			const assetBalanceBobAfter = await api.query.genericAsset.freeBalance(
				assetId,
				bob.address
			);
			expect(assetBalanceBobAfter.toString()).toEqual(
				(
					parseInt(assetBalanceBobBefore.toString()) + TRANSFER_AMOUNT
				).toString()
			);
		});
		it("should be able to force supply account", async () => {
			const assetId = 16001;
			const secondSupplyAccountBalanceBefore =
				await api.query.genericAsset.freeBalance(
					assetId,
					endowedAccounts._availableAccounts[1].address
				);
			await endowedAccounts.send(
				endowedAccounts.api.tx.genericAsset.transfer(
					assetId,
					bob.address,
					TRANSFER_AMOUNT
				),
				endowedAccounts._availableAccounts[1]
			);
			const secondSupplyAccountBalanceAfter =
				await api.query.genericAsset.freeBalance(
					assetId,
					endowedAccounts._availableAccounts[1].address
				);
			expect(
				parseInt(secondSupplyAccountBalanceBefore.toString()) - TRANSFER_AMOUNT
			).toEqual(parseInt(secondSupplyAccountBalanceAfter.toString()));
		});
		it("should be throw error when an account is depleted", async () => {
			const assetId = 16001;
			try {
				await endowedAccounts.send(
					endowedAccounts.api.tx.genericAsset.transfer(
						assetId,
						bob.address,
						TRANSFER_AMOUNT
					),
					endowedAccounts._availableAccounts[3]
				);
			} catch (e) {
				expect(e.message).toEqual(
					"1010: Invalid Transaction: Inability to pay some fees , e.g. account balance too low - Account: 5HBwpKrRi7Ds4zmZgFjMVupcKtRjee1zyiBkVDmgaNE2TuVx"
				);
			}
		});
	});

	describe("heath()", () => {
		it("should fail if there is not any available account", async () => {
			endowedAccounts._availableAccounts = [];
			endowedAccounts._unavailableAccounts = [];
			const sentryEvents$ = {
				next: jest.fn(),
			};

			// should throw expected error
			await expect(endowedAccounts.health(sentryEvents$)).rejects.toEqual(
				new Error("Health Check Failed")
			);
		});

		it("should send an error to sentry if there are less than 3 available accounts", async () => {
			endowedAccounts._availableAccounts = new Array(2);
			endowedAccounts._unavailableAccounts = [];
			const sentryEvents$ = {
				next: jest.fn(),
			};

			// there should be 0 message sending to sentry before calling health()
			expect(sentryEvents$.next.mock.calls.length).toBe(0);

			await endowedAccounts.health(sentryEvents$);

			// there should be 2 messages sending to sentry
			expect(sentryEvents$.next.mock.calls.length).toBe(1);
			expect(sentryEvents$.next.mock.calls[0][0].transaction).toBe(
				"GET|/health"
			);
			expect(sentryEvents$.next.mock.calls[0][0].error.message).toBe(
				"Only 2 accounts available now. Please replace the unavailable accounts"
			);
		});

		it("should not send an error to sentry if there are 4 available accounts", async () => {
			endowedAccounts._availableAccounts = new Array(4);
			endowedAccounts._unavailableAccounts = [];
			const sentryEvents$ = {
				next: jest.fn(),
			};

			// there should be 0 message sending to sentry before calling health()
			expect(sentryEvents$.next.mock.calls.length).toBe(0);

			await endowedAccounts.health(sentryEvents$);

			// there should be 2 messages sending to sentry
			expect(sentryEvents$.next.mock.calls.length).toBe(0);
		});

		it("should send an error to sentry if there are more than 9 unavailable accounts", async () => {
			endowedAccounts._availableAccounts = new Array(4);
			endowedAccounts._unavailableAccounts = new Array(10);
			const sentryEvents$ = {
				next: jest.fn(),
			};

			// there should be 0 message sending to sentry before calling health()
			expect(sentryEvents$.next.mock.calls.length).toBe(0);

			await endowedAccounts.health(sentryEvents$);

			// there should be 2 messages sending to sentry
			expect(sentryEvents$.next.mock.calls.length).toBe(1);
			expect(sentryEvents$.next.mock.calls[0][0].transaction).toBe(
				"GET|/health"
			);
			expect(sentryEvents$.next.mock.calls[0][0].error.message).toBe(
				"10 accounts unavailable now. Please replace them"
			);
		});

		it("should not send an error to sentry if there are 9 unavailable accounts", async () => {
			endowedAccounts._availableAccounts = new Array(4);
			endowedAccounts._unavailableAccounts = new Array(9);
			const sentryEvents$ = {
				next: jest.fn(),
			};

			// there should be 0 message sending to sentry before calling health()
			expect(sentryEvents$.next.mock.calls.length).toBe(0);

			await endowedAccounts.health(sentryEvents$);

			// there should be 2 messages sending to sentry
			expect(sentryEvents$.next.mock.calls.length).toBe(0);
		});
	});
});
