import {
	createContext,
	memo,
	PropsWithChildren,
	ReactElement,
	useContext,
	useEffect,
	useState,
} from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import detectEthereumProvider from "@metamask/detect-provider";

interface MetaMaskExtensionContextType {
	extension: MetaMaskInpageProvider;
}

const MetaMaskExtensionContext = createContext<MetaMaskExtensionContextType>(
	{} as MetaMaskExtensionContextType
);

interface MetaMaskExtensionProviderProps {}

function MetaMaskExtensionProvider({
	children,
}: PropsWithChildren<MetaMaskExtensionProviderProps>): ReactElement<MetaMaskExtensionProviderProps> {
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
}

export default memo(MetaMaskExtensionProvider);

export function useMetaMaskExtension(): MetaMaskExtensionContextType {
	return useContext(MetaMaskExtensionContext);
}
