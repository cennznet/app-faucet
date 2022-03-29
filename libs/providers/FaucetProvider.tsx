import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { CENNZNetNetwork, Chain } from "@/libs/types";

interface FaucetContextType {
	address: string;
	setAddress: Dispatch<SetStateAction<string>>;

	addressType: Chain;
	setAddressType: Dispatch<SetStateAction<Chain>>;

	network: CENNZNetNetwork;
	setNetwork: Dispatch<SetStateAction<CENNZNetNetwork>>;
}

const FaucetContext = createContext<FaucetContextType>({} as FaucetContextType);

interface FaucetProviderProps {}

const FaucetProvider: FC<FaucetProviderProps> = ({ children }) => {
	const [address, setAddress] = useState<string>();
	const [addressType, setAddressType] = useState<Chain>();
	const [network, setNetwork] = useState<CENNZNetNetwork>("nikau");

	return (
		<FaucetContext.Provider
			value={{
				address,
				setAddress,

				addressType,
				setAddressType,

				network,
				setNetwork,
			}}
		>
			{children}
		</FaucetContext.Provider>
	);
};

export default FaucetProvider;

export function useFaucet(): FaucetContextType {
	return useContext(FaucetContext);
}
