import { useMetaMaskExtension } from "@/libs/providers/MetaMaskExtensionProvider";
import {
	createContext,
	FC,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { CENNZNetNetwork, MetaMaskAccount } from "@/libs/types";
import { ensureEthereumChain } from "@/libs/utils";
import { Web3Provider } from "@ethersproject/providers";
import useLocalStorage from "@/libs/hooks/useLocalStorage";

interface MetaMaskWalletContextType {
	connectWallet: (callback?: () => void) => Promise<void>;
	selectedAccount: MetaMaskAccount;
	wallet: Web3Provider;
}

const MetaMaskWalletContext = createContext<MetaMaskWalletContextType>(
	{} as MetaMaskWalletContextType
);

interface MetaMaskWalletProviderProps {}

const MetaMaskWalletProvider: FC<MetaMaskWalletProviderProps> = ({
	children,
}) => {
	const { extension, promptInstallExtension } = useMetaMaskExtension();
	const [CENNZNetwork] = useLocalStorage<CENNZNetNetwork>("network", "nikau");
	const [wallet, setWallet] =
		useState<MetaMaskWalletContextType["wallet"]>(null);
	const [selectedAccount, setSelectedAccount] =
		useState<MetaMaskWalletContextType["selectedAccount"]>(null);

	const connectWallet = useCallback(
		async (callback) => {
			if (!extension) {
				callback?.();
				return promptInstallExtension();
			}

			const accounts = (await extension.request({
				method: "eth_requestAccounts",
			})) as string[];

			if (!accounts?.length)
				return alert(
					"Please create at least one account in MetaMask extension to continue."
				);

			setSelectedAccount({ address: accounts[0] });
			setWallet(new Web3Provider(extension as any));

			await ensureEthereumChain(extension, CENNZNetwork);
		},
		[extension, promptInstallExtension, CENNZNetwork]
	);

	useEffect(() => {
		if (!extension) return;
		const checkAccounts = async () => {
			const accounts = (await extension.request({
				method: "eth_accounts",
			})) as string[];
			if (!accounts?.length) return;

			setSelectedAccount({ address: accounts[0] });
			setWallet(new Web3Provider(extension as any));
			await ensureEthereumChain(extension, CENNZNetwork);
		};

		checkAccounts();
	}, [extension, CENNZNetwork]);

	useEffect(() => {
		if (!selectedAccount?.address || !extension) return;

		const clearAccount = () => setSelectedAccount(null);

		const onAccountsChanged = (accounts: string[]) => {
			if (!accounts?.length) return clearAccount();
			setSelectedAccount({ address: accounts[0] });
		};

		extension.on("accountsChanged", onAccountsChanged);
		extension.on("disconnect", clearAccount);

		return () => {
			extension.removeListener("accountsChanged", onAccountsChanged);
			extension.removeListener("disconnect", clearAccount);
		};
	}, [selectedAccount?.address, extension]);

	return (
		<MetaMaskWalletContext.Provider
			value={{ connectWallet, wallet, selectedAccount }}
		>
			{children}
		</MetaMaskWalletContext.Provider>
	);
};

export default MetaMaskWalletProvider;

export function useMetaMaskWallet(): MetaMaskWalletContextType {
	return useContext(MetaMaskWalletContext);
}
