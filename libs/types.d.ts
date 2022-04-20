import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

export type CENNZnetNetwork = "Nikau" | "Rata";

export interface CENNZnetToken {
	symbol: string;
	assetId: number;
	logo: string;
	decimals: number;
}

export interface TxStatus {
	status: "in-progress" | "success" | "fail";
	message: EmotionJSX.Element | string;
	balance?: string;
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

export interface GenericCoin {
	decimals: number;
	decimalsValue: number;
	symbol: string;
}

declare module "*.svg";
