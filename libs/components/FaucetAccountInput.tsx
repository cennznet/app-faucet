import { useMemo, useEffect, FC } from "react";
import { css } from "@emotion/react";
import { AccountIdenticon } from "@/libs/components";
import { InputAdornment, TextField } from "@mui/material";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import useAddressValidation from "@/libs/hooks/useAddressValidation";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useMetaMaskExtension } from "@/libs/providers/MetaMaskExtensionProvider";
import { isEthereumAddress } from "@/libs/utils";

const FaucetAccountInput: FC = () => {
	const { address, setAddress, addressType, setAddressType } = useFaucet();
	const { inputRef } = useAddressValidation(address, addressType);
	const { extension } = useMetaMaskExtension();

	useEffect(() => {
		if (!address) return setAddressType(null);
		if (isEthereumAddress(address)) return setAddressType("Ethereum");
		setAddressType("CENNZnet");
	}, [address, setAddressType, setAddress]);

	const startAdornment = useMemo(() => {
		if (!address) return null;

		if (addressType === "Ethereum")
			return (
				<Jazzicon diameter={28} seed={jsNumberForAddress(address as string)} />
			);

		return <AccountIdenticon theme="beachball" size={28} value={address} />;
	}, [address, addressType]);

	return (
		<TextField
			multiline={true}
			type="text"
			css={styles.root}
			value={address}
			inputRef={inputRef}
			required
			placeholder={
				!!extension
					? "Enter an Ethereum address or a CENNZnet address"
					: "Enter a CENNZnet address"
			}
			onChange={(e) => setAddress(e.target.value)}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start" css={styles.adornment}>
						{startAdornment}
					</InputAdornment>
				),
			}}
		/>
	);
};

export default FaucetAccountInput;

const styles = {
	root: css`
		width: 100%;
	`,

	adornment: css`
		margin-right: 0;
		> div {
			margin-right: 0.5em !important;
		}
	`,
};
