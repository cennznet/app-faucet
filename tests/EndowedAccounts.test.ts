import { EndowedAccounts } from "@/libs/utils";

describe("EndowedAccounts", () => {
	let endowedAccounts;
	beforeAll(() => {
		const api = jest.fn();
		const seeds = [];
		endowedAccounts = new EndowedAccounts(api, seeds);
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
