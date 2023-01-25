import { ChakraProvider } from "@chakra-ui/react";
import { AppProvider } from "../contexts/AppContext";
import "../styles/globals.css";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
