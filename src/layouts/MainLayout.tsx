import { Container, AppBar, Toolbar, Button, Box } from '@material-ui/core'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { jwtAtom, userAtom } from '../store/jwt'

/**
 * MainLayout props.
 */
export type MainLayoutProps = {
  children: React.ReactNode
}

/**
 * MainLayout component.
 */
export const MainLayout: React.VFC<MainLayoutProps> = (props) => {
  const [jwt, setJwt] = useAtom(jwtAtom)
  const [, setUser] = useAtom(userAtom)

  const logout = () => {
    setJwt(null)
    setUser(null)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Button color="inherit">PCパーツ総選挙 テスト版</Button>
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          {jwt ? (
            <>
              <Link href="/profile">
                <Button color="inherit" variant="text" disableElevation>
                  マイページ
                </Button>
              </Link>
              <div style={{ padding: '0 8px' }}></div>
              <Button
                color="secondary"
                variant="text"
                disableElevation
                onClick={logout}
              >
                ログアウト
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button color="inherit" variant="text" disableElevation>
                  サインイン
                </Button>
              </Link>
              <div style={{ padding: '0 8px' }}></div>
              <Link href="/signup">
                <Button color="inherit" variant="text" disableElevation>
                  サインアップ
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg">
        <Box my={4}>{props.children}</Box>
      </Container>
    </>
  )
}
