import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4C5697',
    },
    secondary: {
      main: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: "\"Proxima Nova\", sans-serif",
    button: {
      textTransform: 'none',
      fontFamily: "\"Proxima Nova\", sans-serif",
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: "\"Proxima Nova\", sans-serif",
      }, 
    },
    MuiTypography: {
      root: {
        color: '#242424',
      }
    },
    MuiOutlinedInput: {
      root: {
      }
    }
  }, 
});
