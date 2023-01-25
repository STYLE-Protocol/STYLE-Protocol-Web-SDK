import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { AppProvider } from "../contexts/AppContext";
import styles from "../styles/globals.css";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const customTheme = extendTheme({ config, styles });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
