import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ConfirmProvider } from 'material-ui-confirm'
import { mainTheme as theme } from '../themes/main'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConfirmProvider>
          <Component {...pageProps} />
        </ConfirmProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
