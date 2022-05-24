import { createContext, FC, useContext, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import { PropsWithChildren } from "@/libs/types";

interface MetaMaskExtensionContextType {
	extension: MetaMaskInpageProvider;
}

const MetaMaskExtensionContext = createContext<MetaMaskExtensionContextType>(
	{} as MetaMaskExtensionContextType
);

interface MetaMaskExtensionProviderProps extends PropsWithChildren {}

const MetaMaskExtensionProvider: FC<MetaMaskExtensionProviderProps> = ({
	children,
}) => {
	const [extension, setExtension] =
		useState<MetaMaskExtensionContextType["extension"]>();

	useEffect(() => {
		detectEthereumProvider({ mustBeMetaMask: true }).then(setExtension);
	}, []);

	return (
		<MetaMaskExtensionContext.Provider value={{ extension }}>
			{children}
		</MetaMaskExtensionContext.Provider>
	);
};

export default MetaMaskExtensionProvider;

export function useMetaMaskExtension(): MetaMaskExtensionContextType {
	return useContext(MetaMaskExtensionContext);
}
