import { VFC } from "react";
import { css } from "@emotion/react";
import { GlobalStyles, Theme } from "@mui/material";

const globalStyles = (
	<GlobalStyles
		styles={({ palette, transitions }: Theme) => css`
			html {
				scroll-behavior: smooth;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				height: 100%;
			}

			body {
				font-size: 16px;
				line-height: 1.25;
				color: ${palette.grey["900"]};
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
					Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
					"Segoe UI Symbol";
				height: 100%;
			}

			input {
				font-family: inherit;
				font-size: inherit;
			}

			button {
				background-color: transparent;
				border-width: 0;
				font-family: inherit;
				font-size: inherit;
				font-style: inherit;
				font-weight: inherit;
				line-height: inherit;
				padding: 0;
			}

			pre {
				font-family: monospace;
				display: inline;
			}

			#__next {
				position: relative;
				min-width: 960px;
				height: 100%;

				.MuiOutlinedInput-root {
					border-radius: 4px;
					line-height: 1;

					&:hover,
					&:active,
					&.Mui-focused {
						.MuiOutlinedInput-notchedOutline {
							border-color: ${palette.primary.main};
							border-width: 1px;
						}
					}

					.MuiOutlinedInput-input:not(textarea) {
						padding: 0em 0.78125em;
					}

					textarea.MuiOutlinedInput-input {
						line-height: 1.25;
					}

					.MuiOutlinedInput-input:not(.MuiSelect-select) {
						font-family: monospace;
						letter-spacing: -0.025em;
					}

					.MuiOutlinedInput-notchedOutline {
						border-color: ${palette.text.secondary};
					}

					.MuiSelect-select[aria-expanded="true"] {
						color: ${palette.primary.main};

						.MuiSvgIcon-root {
							color: ${palette.primary.main};
						}
					}

					.MuiList-root {
						padding: 0;
					}

					.MuiSvgIcon-root {
						transition: transform ${transitions.duration.shortest}ms
							${transitions.easing.easeInOut};
					}

					.MuiSelect-iconOpen {
						color: ${palette.primary.main};
					}
				}
			}

			#__next ~ .MuiTooltip-popper {
				font-weight: normal;
				.MuiTooltip-tooltip {
					border-radius: 4px;
					background-color: white;
					color: ${palette.text.primary};
					padding: 1em;
					box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.1);
					border: 1px solid ${palette.secondary.main};
					font-size: 12px;
				}

				.MuiTooltip-arrow {
					color: white;
					&:before {
						outline: 1px solid ${palette.secondary.main};
					}
				}
			}
		`}
	/>
);

const CssGlobal: VFC = () => globalStyles;

export default CssGlobal;
