import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { I18nProvider } from "../components/I18nProvider";
import { i18nConfig } from "../i18n.config";
import "../styles/globals.css";

// 创建 MUI 主题
const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider options={i18nConfig}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </I18nProvider>
  );
}
