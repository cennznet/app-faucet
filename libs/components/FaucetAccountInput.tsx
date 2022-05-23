import { VFC, useMemo, useEffect } from "react";
import { css } from "@emotion/react";
import { AccountIdenticon } from "@/libs/components";
import { InputAdornment, TextField } from "@mui/material";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import useAddressValidation from "@/libs/hooks/useAddressValidation";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { isEthereumAddress } from "@/libs/utils";

const FaucetAccountInput: VFC = () => {
	const { address, setAddress, addressType, setAddressType } = useFaucet();
	const { inputRef } = useAddressValidation(address, addressType);

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
			placeholder={"Enter a CENNZnet or Ethereum address"}
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
