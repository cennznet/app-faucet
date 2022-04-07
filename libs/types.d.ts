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

interface MetaMaskNetwork {
	chainId: string;
	chainName: string;
	rpcUrl: string;
}

export interface MetamaskNetworks {
	Nikau: MetaMaskNetwork;
	Rata: MetaMaskNetwork;
}

export interface MetaMaskAccount {
	address: string;
}

export type Chain = "CENNZnet" | "Ethereum";

declare module "*.svg";
