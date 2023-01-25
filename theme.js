import { extendTheme } from "@chakra-ui/react";
import { whiten, darken } from "@chakra-ui/theme-tools";
const colors = {
  dark: "#121212",
  secondary: "#808080",
  primary: "#FFFF0F",
  danger: "#A40D0D",
  disabled: {
    primary: "#454545",
  },
  text: {
    primary: "#6E7276",
    dark: "#121212",
  },
  bgSecondary: {
    light: "#3F4349",
    dark: "#1B1C1E",
    danger: "#392222",
  },
  background: "#F5F5F5",
  gradient: "linear-gradient(108.42deg, #393939 12.55%, #080808 100.59%)",
  glass: "linear-gradient(90deg, #a4a4a444, #383838)",
};
const textStyles = {
  title: {
    color: "primary",
    fontWeight: "normal",
    fontSize: "26px",
    letterSpacing: "1px",
  },
  primary: {
    color: "secondary",
    fontWeight: "medium",
    fontSize: "16px",
  },
  light: {
    color: "white",
    fontWeight: "medium",
    fontSize: "16px",
  },
  dark: {
    color: "text.dark",
    fontSize: "16px",
  },
  secondary: {
    light: {
      color: "white",
      fontWeight: "medium",
      fontSize: "14px",
    },
    dark: {
      color: "text.dark",
      fontSize: "14px",
    },
  },
  hint: {
    primary: {
      color: "primary",
      fontWeight: "medium",
      fontSize: "14px",
      fontStyle: "italic",
    },
    light: {
      color: "primary",
      fontWeight: "medium",
      fontSize: "14px",
      fontStyle: "italic",
    },
    dark: {
      color: "secondary",
      fontWeight: "medium",
      fontSize: "14px",
      fontStyle: "italic",
    },
    danger: {
      color: "danger",
      fontWeight: "medium",
      fontSize: "14px",
      fontStyle: "italic",
    },
  },
};
const fonts = {
  heading: `'Space Grotesk', sans-serif`,
  body: `'Space Grotesk', sans-serif`,
};
const Progress = {
  baseStyle: {
    bg: "secondary",
    filledTrack: {
      bg: "primary",
    },
  },
  variants: {
    primary: {
      filledTrack: {
        bg: "primary",
        borderRadius: "2xl",
      },
      track: {
        borderRadius: "2xl",
      },
    },
    danger: {
      filledTrack: {
        bg: "danger",
        borderRadius: "2xl",
      },
      track: {
        borderRadius: "2xl",
      },
    },
  },
};
const Button = {
  variants: {
    primary: {
      color: "dark",
      bg: "primary",
      w: "11.5rem",
      borderRadius: "2xl",
      p: 6,
      color: "dark",
      fontSize: "16px",
      fontWeight: "800",
      lineHeight: 1,
      // textShadow: '0px 0px 0px #000000',
      _hover: {
        bg: darken("primary", 10),
        _disabled: {
          bg: darken("primary", 10),
        },
      },
    },
    dark: {
      color: "white",
      bg: "gradient",
      w: "11.5rem",
      borderRadius: "2xl",
      p: 6,
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: 1,
      // textShadow: '0px 0px 0px #000000',

      _hover: {
        // bg: darken('primary', 10),
        filter: "contrast(1.2)",
        _disabled: { filter: "contrast(1.2)" },
      },
    },
    secondary: {
      color: "dark",
      bg: "white",
      w: "11.5rem",
      p: 6,
      fontSize: "16px",
      fontWeight: "bold",
      _hover: {
        bg: darken("white", 10),
        _disabled: {
          bg: "secondary",
        },
      },
      _disabled: {
        bg: "secondary",
      },
    },
    marketplace: {
      border: "none",
      bgColor: "white",
      color: "dark",
      _hover: {
        bg: "primary",
        _disabled: {
          bg: darken("primary", 10),
        },
      },
    },
    outline: {
      color: "white",
      borderColor: "light",
      fontSize: "14px",
      fontWeight: "medium",
      borderRadius: "1rem",
      p: 6,
      _hover: {
        bg: "primary",
        color: "black",
        fontWeight: "bold",
        _disabled: {
          color: "white",
        },
      },
      _active: {
        bg: "primary",
        color: "black",
        fontWeight: "bold",
      },
    },
    transparent: {
      color: "white",
      border: "none",
      fontSize: "14px",
      fontWeight: "bold",
      p: 6,
      _hover: {
        bg: "disabled.primary",
        color: "light",
        fontWeight: "bold",
      },
      _active: {
        bg: "disabled.primary",
        color: "light",
        fontWeight: "bold",
      },
    },
    unstyled: {
      color: "white",
      fontSize: "20px",
      fontWeight: "600",
    },
  },
};
const Checkbox = {
  variants: {
    marketplace: {
      control: {
        borderColor: "dark",
        _checked: {
          borderColor: "dark !important",
          bg: "primary",
          color: "dark",
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
  },
  baseStyle: {
    control: {
      borderColor: "bgSecondary.light",
      _checked: {
        borderColor: "primary !important",
        bg: "primary",
        color: "dark",
        _hover: {
          bg: darken("primary", 10),
        },
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
const Input = {
  baseStyle: {
    control: {
      _focusVisible: {
        boxShadow: "none",
      },
    },
  },
};
const Tabs = {
  variants: {
    unstyled: {
      marging: "0",
      root: {
        w: "100%",
      },
      tablist: {
        w: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      tab: {
        color: "secondary",
        fontWeight: "bold",
        fontSize: "xl", //20px
        _selected: {
          color: "white",
          boxShadow: "none",
        },
      },
    },
  },
};
const components = {
  Button,
  Tabs,
  Checkbox,
  Progress,
  Input,
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "1440px",
  "3xl": "2560px",
};

const theme = extendTheme({
  colors,
  fonts,
  textStyles,
  components,
  breakpoints,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default theme;
