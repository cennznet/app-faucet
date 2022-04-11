import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { css } from "@emotion/react";
import { AccountIdenticon } from "@/libs/components";
import { InputAdornment, TextField, Theme } from "@mui/material";

interface FaucetAccountInputProps {
	setAddress: Dispatch<SetStateAction<string>>;
	address: string;
}
const FaucetAccountInput: FC<FaucetAccountInputProps> = ({
	setAddress,
	address,
}) => {
	const startAdornment = useMemo(() => {
		if (!address) return null;
		return <AccountIdenticon theme="beachball" size={28} value={address} />;
	}, [address]);

	return (
		<TextField
			multiline={true}
			type="text"
			css={styles.root}
			value={address}
			required
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

	adornment: ({ palette }: Theme) => css`
		margin-right: 0;
		> div {
			margin-right: 0.5em !important;
		}
	`,
};
