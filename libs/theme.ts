import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1da1f2",
		},
	},
	typography: {
		fontFamily: ["Roboto", "sans-serif"].join(","),
	},
});

export default theme;
