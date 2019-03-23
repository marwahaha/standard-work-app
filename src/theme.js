import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fdbb2d'
    },
    secondary: {
      main: '#ff1d00'
    }
  },
  shape: {
    borderRadius: 7
  },
  typography: {
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none',
        textTransform: 'capitalize',
        '&:active': {
          boxShadow: 'none'
        }
      },
      outlined: {
        textTransform: 'capitalize'
      }
    },
    props: {
      MuiButton: {}
    }
  }
})

export default theme
