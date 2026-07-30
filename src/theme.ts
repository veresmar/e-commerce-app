import { createTheme } from "@mui/material/styles";

// 8-bit / NES-inspired palette (5 core colors)
const COLORS = {
  bg: "#1a1c2c", // deep navy background
  panel: "#2b2f4a", // raised panel
  green: "#38b764", // primary action green
  magenta: "#ef476f", // secondary / danger accent
  ink: "#f4f4f0", // off-white text
  shadow: "#0d0e18", // near-black hard shadow
};

const PIXEL = '"Press Start 2P", "VT323", monospace';

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: COLORS.bg,
      paper: COLORS.panel,
    },
    primary: {
      main: COLORS.green,
      contrastText: COLORS.shadow,
    },
    secondary: {
      main: COLORS.magenta,
      contrastText: COLORS.ink,
    },
    text: {
      primary: COLORS.ink,
      secondary: "#a7a7c4",
    },
    divider: COLORS.shadow,
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: PIXEL,
    h4: {
      fontFamily: PIXEL,
      fontSize: "1.4rem",
      lineHeight: 1.5,
      letterSpacing: "1px",
    },
    body1: {
      fontFamily: PIXEL,
      fontSize: "0.7rem",
      lineHeight: 1.9,
    },
    body2: {
      fontFamily: PIXEL,
      fontSize: "0.6rem",
      lineHeight: 1.9,
    },
    caption: {
      fontFamily: PIXEL,
      fontSize: "0.6rem",
      letterSpacing: "1px",
    },
    button: {
      fontFamily: PIXEL,
      fontSize: "0.65rem",
      letterSpacing: "1px",
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `3px solid ${COLORS.shadow}`,
          boxShadow: `4px 4px 0 0 ${COLORS.shadow}`,
          padding: "10px 16px",
          textTransform: "uppercase",
          transition: "transform 80ms steps(2), box-shadow 80ms steps(2)",
          "&:hover": {
            boxShadow: `6px 6px 0 0 ${COLORS.shadow}`,
            transform: "translate(-2px, -2px)",
          },
          "&:active": {
            boxShadow: `0px 0px 0 0 ${COLORS.shadow}`,
            transform: "translate(4px, 4px)",
          },
        },
        outlinedSecondary: {
          backgroundColor: COLORS.magenta,
          color: COLORS.ink,
          "&:hover": {
            backgroundColor: COLORS.magenta,
            boxShadow: `6px 6px 0 0 ${COLORS.shadow}`,
            transform: "translate(-2px, -2px)",
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: "8px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `3px solid ${COLORS.shadow} !important`,
          margin: "0 !important",
          color: COLORS.ink,
          backgroundColor: COLORS.panel,
          textTransform: "uppercase",
          fontSize: "0.6rem",
          padding: "10px 14px",
          boxShadow: `3px 3px 0 0 ${COLORS.shadow}`,
          "&.Mui-selected": {
            backgroundColor: COLORS.green,
            color: COLORS.shadow,
            "&:hover": {
              backgroundColor: COLORS.green,
            },
          },
          "&:hover": {
            backgroundColor: COLORS.magenta,
            color: COLORS.ink,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `4px solid ${COLORS.shadow}`,
          boxShadow: `8px 8px 0 0 ${COLORS.shadow}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderBottomWidth: "3px",
          borderColor: COLORS.shadow,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: PIXEL,
          fontSize: "0.7rem",
          "&:before": {
            borderBottom: `3px solid ${COLORS.shadow}`,
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: `3px solid ${COLORS.green}`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          "& .MuiOutlinedInput-notchedOutline": {
            border: `3px solid ${COLORS.shadow}`,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: PIXEL,
          fontSize: "0.65rem",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: PIXEL,
          fontSize: "0.6rem",
          color: COLORS.ink,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: COLORS.shadow,
          "&.Mui-checked": {
            color: COLORS.green,
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: PIXEL,
          fontSize: "0.8rem",
        },
      },
    },
  },
});

export default theme;
