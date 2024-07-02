'use client'

import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#191A2C',
      dark: '#0F101C',
      light: '#2E3048'
    },
    secondary: {
      main: '#A7E628',
      dark: '#6D9A1C',
      light: '#D1F571'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingX: '20px',
          paddingY: '10px',
          borderRadius: '40px',
          '&.text-black': {
            color: '#000'
          },
          '&:hover': {
            backgroundColor: '#D1F571'
          }
        },
        textPrimary: {
          borderRadius: '0px',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        },
        containedPrimary: {
          backgroundColor: '#A7E628',
          '&:hover': {
            backgroundColor: '#D1F571'
          }
        },
        outlinedPrimary: {
          borderColor: '#A7E628',
          borderRadius: '40px',
          color: 'white',
          borderWidth: '2px',
          '&:hover': {
            borderColor: '#D1F571',
            color: 'black'
          },
          paddingX: '20px'
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#A7E628'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-selected': {
            color: '#A7E628'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            color: '#e0e0e0',
            backgroundColor: '#282a36',
            borderRadius: '4px'
          },
          width: '100%',
          '& .MuiInputLabel-root': {
            color: '#a0a0b0'
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#3b3b5c'
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#ffffff'
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff'
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#3b3b5c'
            },
            '&:hover fieldset': {
              borderColor: '#ffffff'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff'
            },
            '&.Mui-focused .MuiInputLabel-root': {
              color: 'white !important'
            }
          },
          '& .MuiFilledInput-root': {
            backgroundColor: '#282a36',
            '&:hover': {
              backgroundColor: '#3a3a4a'
            },
            '&.Mui-focused': {
              backgroundColor: '#3a3a4a'
            }
          }
        }
      }
    }
  }
})
