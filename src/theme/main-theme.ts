import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0099cc" },
    secondary: { main: "#ff9933" },
    text: {
      primary: "#ffffff",
      secondary: "#444444",
      disabled: "#999999",
    },
    background: { default: "#121212", paper: "#fffff5" },
  },
  typography: {
    fontFamily: "Roboto", // You can define the fontFamily here if needed.
    htmlFontSize: 16, // This will keep 1rem equal to 16px
    // Define relative font sizes for all typography variants at different breakpoints
    h1: {
      fontSize: "2rem", // Font size for h1 variant (2 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "16px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "18px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "20px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "22px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "24px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "26px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "28px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "30px",
      },
    },
    h2: {
      fontSize: "1.5rem", // Font size for h2 variant (1.5 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "14px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "16px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "18px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "20px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "22px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "24px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "26px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "28px",
      },
    },
    h3: {
      fontSize: "1.25rem", // Font size for h3 variant (1.25 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "12px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "14px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "16px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "18px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "20px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "22px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "24px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "26px",
      },
    },
    h4: {
      fontSize: "1rem", // Font size for h4 variant (1 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "10px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "12px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "14px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "16px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "18px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "20px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "22px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "24px",
      },
    },
    h5: {
      fontSize: "0.875rem", // Font size for h5 variant (0.875 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "8px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "10px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "12px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "14px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "16px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "18px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "20px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "22px",
      },
    },
    h6: {
      fontSize: "0.75rem",
      fontWeight: "bold",
      "@media (max-width: 320px)": {
        fontSize: "7px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "8px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "10px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "12px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "14px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "16px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "2rem",
      },

      "@media (min-width: 2561px )": {
        fontSize: "20px",
      },
    },
    subtitle1: {
      fontSize: "1.125rem", // Font size for subtitle1 variant (1.125 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "10px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "12px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "14px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "16px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "18px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "20px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "22px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "24px",
      },
    },
    subtitle2: {
      fontSize: "1rem", // Font size for subtitle2 variant (1 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "8px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "10px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "12px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "14px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "16px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "18px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "20px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "22px",
      },
    },
    body1: {
      fontSize: "1.25rem", // Font size for body1 variant (1.25 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "10px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "12px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "14px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "16px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "18px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "15px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "22px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "24px",
      },
    },
    body2: {
      fontSize: "1rem", // Font size for body2 variant (1 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "8px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "10px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "12px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "14px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "16px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "14px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "20px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "22px",
      },
    },
    button: {
      fontSize: "1.5rem", // Font size for button variant (1.5 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "12px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "14px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "16px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "18px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "20px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "22px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "24px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "26px",
      },
    },
    caption: {
      fontSize: "0.875rem", // Font size for caption variant (0.875 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "7px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "8px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "10px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "12px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "14px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "16px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "18px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "20px",
      },
    },
    overline: {
      fontSize: "0.75rem", // Font size for overline variant (0.75 times the base font size)
      "@media (max-width: 320px)": {
        fontSize: "6px",
      },
      "@media (min-width: 321px ) and (max-width: 375px)": {
        fontSize: "7px",
      },

      "@media (min-width: 376px ) and (max-width: 425px)": {
        fontSize: "8px",
      },

      "@media (min-width: 426px ) and (max-width: 768px)": {
        fontSize: "10px",
      },

      "@media (min-width: 769px ) and (max-width: 1024px)": {
        fontSize: "12px",
      },

      "@media (min-width: 1025px ) and (max-width: 1440px)": {
        fontSize: "14px",
      },

      "@media (min-width: 1441px ) and (max-width: 2560px)": {
        fontSize: "16px",
      },

      "@media (min-width: 2561px )": {
        fontSize: "18px",
      },
    },
  },
});

export default responsiveFontSizes(theme);
