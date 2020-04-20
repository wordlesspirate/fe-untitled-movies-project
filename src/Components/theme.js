import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#5E548E" },
    secondary: { A400: "#FFFFFF" },
    third: { A400: "#FFFFFF" },
    background: {
      default: "#A8D0DB",
    },
  },
  status: {
    danger: "orange",
  },
});

export default theme;
