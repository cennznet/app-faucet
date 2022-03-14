import { EndowedAccounts } from "@/libs/utils";
import { ENDOWED_ACCOUNT_SEEDS, TRANSFER_AMOUNT } from "@/libs/constants";
import { Api } from "@cennznet/api";

describe("EndowedAccounts", () => {
	let endowedAccounts;
	beforeAll(async () => {
		const api = await Api.create({
			provider: "wss://nikau.centrality.me/public/ws",
		});
		endowedAccounts = new EndowedAccounts(api, ENDOWED_ACCOUNT_SEEDS);
	});

	describe("send()", () => {
		it("should fail if there is not any available account", async () => {
			const assetId = 16000;
			await endowedAccounts.send(
				endowedAccounts.api.tx.genericAsset.transfer(
					assetId,
					"5GQwoMjzyvpuQXBTADfQ8B5CTukK1wKs2F4DdwFLaZKBr4YV",
					TRANSFER_AMOUNT
				)
			);
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

		it("should send an error to sentry if there are less than 4 available accounts", async () => {
			endowedAccounts._availableAccounts = new Array(3);
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
				"Only 3 accounts available now. Please replace the unavailable accounts"
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
