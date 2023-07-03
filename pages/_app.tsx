import { CacheProvider, EmotionCache } from "@emotion/react";
import { ColorModeContextProvider } from "@modules/common/DarkMode";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import createEmotionCache from "../src/createEmotionCache";
import { AppStateProvider, globalReducers, initialState } from "../src/store";
import "../styles/index.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
 
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>NASA Explorer | Unlock the Wonders of the Universe.</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/nasa.svg" type="image/x-icon" />
      </Head>
      <AppStateProvider reducer={globalReducers} initialState={initialState}>
        <ColorModeContextProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ColorModeContextProvider>
      </AppStateProvider>
    </CacheProvider>
  );
}
