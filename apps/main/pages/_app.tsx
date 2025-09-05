import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import { CacheProvider } from '@emotion/react';
// import createEmotionCache from '@emotion/cache';

// 创建 Emotion 缓存
// const clientSideEmotionCache = createEmotionCache({ key: 'css' });

// 创建 MUI 主题
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  console.log('%c [ Component, pageProps ]-4', 'font-size:13px; background:pink; color:#bf2c9f;', Component, pageProps)
  return (
    // <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    // </CacheProvider>
  );
}
