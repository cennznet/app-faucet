import { FC } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { AccountIdenticon } from "@/libs/components";
import { CENNZnetBlue } from "@/assets/vectors";

interface FaucetAccountInputProps {
	setAddress: Function;
	address: string;
}
const FaucetAccountInput: FC<FaucetAccountInputProps> = ({
	setAddress,
	address,
}) => {
	return (
		<div css={styles.addressInputContainer}>
			{!!address && (
				<AccountIdenticon theme="beachball" size={28} value={address} />
			)}
			{!address && (
				<Image src={CENNZnetBlue} width={28} height={28} alt="cennz-logo" />
			)}
			<input
				type="text"
				value={address}
				placeholder={"Enter your CENNZnet address"}
				onChange={(e) => setAddress(e.target.value)}
			/>
		</div>
	);
};

export default FaucetAccountInput;

const styles = {
	addressInputContainer: css`
		background: #ffffff;
		border: 1px solid #979797;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 1em;
		height: 3.5em;
		width: 100%;
		border-radius: 4px;

		input {
			margin-left: 0.7em;
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
};
