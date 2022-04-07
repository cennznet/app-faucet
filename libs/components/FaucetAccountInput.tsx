import { VFC, useMemo, useEffect } from "react";
import { css } from "@emotion/react";
import { AccountIdenticon } from "@/libs/components";
import { InputAdornment, TextField } from "@mui/material";
import { useMetaMaskWallet } from "@/libs/providers/MetaMaskWalletProvider";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import useAddressValidation from "@/libs/hooks/useAddressValidation";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const FaucetAccountInput: VFC = () => {
	const { selectedAccount } = useMetaMaskWallet();
	const { address, setAddress, addressType, setAddressType } = useFaucet();
	const { inputRef } = useAddressValidation(
		address ?? selectedAccount?.address,
		addressType
	);

	useEffect(() => {
		if (selectedAccount && !address) setAddress(selectedAccount.address);
		if (!address) return setAddressType(null);

		if (address.slice(0, 2) === "0x") return setAddressType("Ethereum");
		setAddressType("CENNZnet");
	}, [address, setAddressType, selectedAccount, setAddress]);

	const displayJazzicon =
		(selectedAccount && addressType !== "CENNZnet") ||
		(address && addressType === "Ethereum");

	const startAdornment = useMemo(() => {
		if (!address) return null;

		if (addressType === "CENNZnet")
			return <AccountIdenticon theme="beachball" size={28} value={address} />;

		if (displayJazzicon)
			return (
				<Jazzicon
					diameter={28}
					seed={jsNumberForAddress(
						(selectedAccount?.address as string) ?? (address as string)
					)}
				/>
			);
	}, [address, addressType, displayJazzicon, selectedAccount]);

	return (
		<TextField
			multiline={true}
			type="text"
			css={styles.root}
			value={address}
			inputRef={inputRef}
			required
			placeholder="Enter CENNZnet Address or Connect MetaMask"
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
