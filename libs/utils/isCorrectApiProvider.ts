import { Api } from "@cennznet/api";
import { CENNZnetNetwork } from "@/libs/types";

export default function isCorrectApiProvider(
	api: Api,
	network: CENNZnetNetwork
): boolean {
	return api?.runtimeChain.toString().includes(network);
}
