import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {

    primary: { 500: "#FFFFFF" },
    secondary: { A400: "#FFFFFF" },
    background: {
      default: "#5E548E",
    },

    primary: { 500: "#5E548E" },
    secondary: { A400: "#747c92" },
    option1: { lightBlue: "#A8D0DB" },
    option2: { greyish: "747C92" },
    option3: { white: "FFFFFF" },
    option4: { purple: "#5E548E" },
    option5: { black: "#041B15" },

  },
  status: {
    danger: "orange",
  },
  background: {
    option1: { lightBlue: "#A8D0DB" },
    option2: { greyish: "747C92" },
    option3: { white: "FFFFFF" },
    option4: { purple: "#5E548E" },
    option5: { black: "#041B15" },
  },
});

export default theme;
