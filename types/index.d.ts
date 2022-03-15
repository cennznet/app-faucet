export type CENNZnetNetwork = "Nikau" | "Rata";

export interface CENNZnetToken {
	symbol: string;
	assetId: number;
	logo: string;
}

export interface TxStatus {
	status: "in-progress" | "success" | "fail";
	message: string;
}
