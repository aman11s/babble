import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
    primary: {
      main: "#5A49E4",
      light: "#6b5be7",
      dark: "#5142cd",
    },
  },
});
