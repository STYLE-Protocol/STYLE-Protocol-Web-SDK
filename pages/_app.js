import "../styles/globals.css";
import {
  ChakraProvider,
  ThemeProvider,
  ColorModeProvider,
} from "@chakra-ui/react";
import { AppProvider } from "../contexts/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}

export default MyApp;
