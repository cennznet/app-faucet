import { createContext, FC, useContext, useEffect, useState } from "react";
import { Api } from "@cennznet/api";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import {
	CENNZNET_NIKAU_API_URL,
	CENNZNET_RATA_API_URL,
} from "@/libs/constants";

type CENNZApiContextType = {
	api: Api;
};

const CENNZApiContext = createContext<CENNZApiContextType>(null);

const CENNZApiProvider: FC = ({ children }) => {
	const { network } = useFaucet();
	const [api, setApi] = useState<Api>(null);

	useEffect(() => {
		const instance = new Api({
			provider:
				network === "Nikau" ? CENNZNET_NIKAU_API_URL : CENNZNET_RATA_API_URL,
		});

		instance.isReady.then(() => {
			setApi(instance);
			window.onunload = async () => await instance.disconnect();
		});

		return () => {
			instance.disconnect();
		};
	}, [network]);

	return (
		<CENNZApiContext.Provider value={{ api }}>
			{children}
		</CENNZApiContext.Provider>
	);
};

export default CENNZApiProvider;

export function useCENNZApi(): CENNZApiContextType {
	return useContext(CENNZApiContext);
}
