import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#5E548E" },
    secondary: { A400: "#747c92" },
  },
  status: {
    danger: "orange",
  },
});

export default theme;
