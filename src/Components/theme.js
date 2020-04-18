import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#FFFFFF" },
    secondary: { A400: "#FFFFFF" },
    background: {
      default: "#5E548E",
    },
  },
  status: {
    danger: "orange",
  },
});

export default theme;
