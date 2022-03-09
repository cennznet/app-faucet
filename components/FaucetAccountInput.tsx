import { FC, useState } from "react";
import { css } from "@emotion/react";
import AccountIdenticon from "@/components/AccountIdenticon";
import { PLACEHOLDER_ADDRESS } from "@/libs/constants";
import { useSession } from "next-auth/react";

const FaucetAccountInput: FC = () => {
	const [address, setAddress] = useState<string>("");
	const { data: session } = useSession();

	return (
		<div css={styles.addressInputContainer}>
			<AccountIdenticon
				css={styles.accountIdenticon}
				theme="beachball"
				size={28}
				value={address ? address : PLACEHOLDER_ADDRESS}
			/>
			<input
				type="text"
				placeholder={PLACEHOLDER_ADDRESS}
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				disabled={!!session?.validAccount}
			/>
		</div>
	);
};

export default FaucetAccountInput;

export const styles = {
	addressInputContainer: css`
		background: #ffffff;
		border: 1px solid #979797;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0px 15px;
		height: 60px;
		width: 100%;
		input {
			margin-left: 10px;
			width: 100%;
			height: 100%;
			background: transparent;
			border: none;
			text-overflow: ellipsis;
			font-style: normal;
			font-weight: bold;
			font-size: 16px;
			line-height: 124%;
			&:focus-visible {
				outline: none;
			}
		}
	`,
	accountIdenticon: css`
		align-self: center;
		margin-right: 5px;
	`,
};
