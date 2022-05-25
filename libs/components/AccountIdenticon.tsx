import { FC, useLayoutEffect, useState, useDeferredValue } from "react";
import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import type { IdentityProps } from "@polkadot/react-identicon/types";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const Identicon = dynamic(() => import("@polkadot/react-identicon"), {
	ssr: false,
});

interface Props extends IdentityProps {
	fadeOnChange?: boolean;
}

const AccountIdenticon: FC<Props> = ({ value, fadeOnChange, ...props }) => {
	const { addressType } = useFaucet();
	const [visible, setVisible] = useState<boolean>(false);
	const address = useDeferredValue(value);

	useLayoutEffect(() => {
		if (!address || !addressType || !fadeOnChange) return;
		setVisible(false);
		setTimeout(() => setVisible(true), 200);
	}, [address, addressType, fadeOnChange]);

	return (
		<>
			{addressType === "CENNZnet" && (
				<Identicon
					css={styles.iconContainer(fadeOnChange, visible)}
					value={address}
					size={28}
					theme={"beachball"}
					{...props}
				/>
			)}
			{addressType === "Ethereum" && (
				<span
					css={[styles.iconContainer(fadeOnChange, visible), styles.metamask]}
				>
					<Jazzicon
						diameter={28}
						seed={jsNumberForAddress(address as string)}
					/>
				</span>
			)}
		</>
	);
};

export default AccountIdenticon;

const styles = {
	iconContainer: (fadeOnChange: boolean, visible: boolean) => css`
		opacity: ${!fadeOnChange ? 1 : visible ? 1 : 0};
		transition: opacity 0.2s;
	`,

	metamask: css`
		margin-right: 0.5em;
	`,
};
