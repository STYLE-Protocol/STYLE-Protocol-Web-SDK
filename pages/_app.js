import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProvider } from "../contexts/AppContext";
import "../styles/globals.css";
import styles from "../styles/globals.css";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
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
