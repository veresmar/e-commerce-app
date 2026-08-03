import { createTheme } from "@mui/material/styles";

// 8-bit palette (5 core colors)
const COLORS = {
  bg: "#1a1c2c", // deep navy background
  panel: "#2b2f4a", // raised panel
  primaryGreen: "#7eb738ff", // primary action 
  primaryPink: "#ec69beff", // secondary / danger accent
  ink: "#f4f4f0", // off-white text
  shadow: "#130d18ff", // near-black hard shadow
};

const PIXEL = 'monospace';

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: COLORS.bg,
      paper: COLORS.panel,
    },
    primary: {
      main: COLORS.primaryGreen,
      contrastText: COLORS.shadow,
    },
    secondary: {
      main: COLORS.primaryPink,
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
      fontSize: "1.2rem",
      lineHeight: 1.5,
      letterSpacing: "1px",
    },
    body1: {
      fontSize: "0.7rem",
      lineHeight: 1.9,
    },
    body2: { // Task (display)
      fontSize: ".8rem",
      lineHeight: 1.9,
      margin: '0',
     label: {
      margin: '0',
     }
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          fontSize: '3rem', // ADD NEW TASK button
          border: `3px solid ${COLORS.shadow}`,
          boxShadow: `4px 4px 0 0 ${COLORS.shadow}`,
          padding: "10px 16px",
          textTransform: "uppercase",
          transition: "transform 80ms steps(2), box-shadow 80ms steps(2)",
          

          "@media (max-width:650px)": {
            width: '100%',
            fontSize: "2rem",
          },
          "&:hover": {
            boxShadow: `6px 6px 0 0 ${COLORS.shadow}`,
            transform: "translate(-2px, -2px)",
          },
          "&:active": {
            boxShadow: "0 0 0 black",
          }
         
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
        root: { // buttonsTab ALL ACTIVE COMPLETED
          borderRadius: 0,
          border: `3px solid ${COLORS.shadow} !important`,
          margin: "0 !important",
          color: COLORS.ink,
          backgroundColor: COLORS.panel,
          textTransform: "uppercase",
          fontSize: "1.2em",
          padding: "10px 14px",
          boxShadow: `3px 3px 0 0 ${COLORS.shadow}`,
          "&.Mui-selected": {
            backgroundColor: COLORS.primaryGreen,
            color: COLORS.shadow,
            "&:hover": {
              backgroundColor: COLORS.primaryGreen,
            },
          },
          "&:hover": {
            backgroundColor: COLORS.primaryPink,
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
          
          // fontSize: "1rem",
          
          "&:before": {
            borderBottom: `3px solid ${COLORS.shadow}`,
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: `3px solid ${COLORS.primaryGreen}`,
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
    MuiInputLabel: { // Title, Description
      styleOverrides: {
        root: {
          fontSize: ".85rem",
          "&.MuiInputLabel-shrink": { // Deadline
          fontSize: "1.15rem",
      },
        },
      },
    },
    MuiFormLabel: { // Priority, Category
      styleOverrides: {
        root: {
          fontSize: ".85rem",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: COLORS.shadow,
          "&.Mui-checked": {
            color: COLORS.primaryGreen,
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: PIXEL,
          fontSize: "0.8rem", // Add New Task text
        },
      },
    },
  },
});

export default theme;