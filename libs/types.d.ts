export type CENNZNET_NETWORK = "nikau" | "rata" | "local";

export interface CENNZnetToken {
	symbol: string;
	assetId: number;
	logo: string;
}

export interface TxStatus {
	status: "in-progress" | "success" | "fail";
	message: string;
}
