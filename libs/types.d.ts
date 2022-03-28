export { CENNZNetNetwork } from "@cennznet/api/types";

export interface CENNZnetToken {
	symbol: string;
	assetId: number;
	logo: string;
}

interface NetworkOption {
	name: CENNZNetNetwork;
	img: string;
}

export interface NetworkOptions {
	nikau: NetworkOption;
	rata: NetworkOption;
}

interface MetaMaskNetwork {
	chainId: string;
	chainName: string;
	rpcUrl: string;
}

export interface MetamaskNetworks {
	nikau: MetaMaskNetwork;
	rata: MetaMaskNetwork;
}

export interface TxStatus {
	status: "in-progress" | "success" | "fail";
	message: string;
}

export interface MetaMaskAccount {
	address: string;
}

declare module "*.svg";
