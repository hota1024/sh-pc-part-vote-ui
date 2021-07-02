import { Container, AppBar, Toolbar, Button, Box } from '@material-ui/core'
import Link from 'next/link'

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
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Button color="inherit">PCパーツ総選挙 テスト版</Button>
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          <Button color="inherit" variant="text" disableElevation>
            サインイン
          </Button>
          <div style={{ padding: '0 8px' }}></div>
          <Button color="inherit" variant="text" disableElevation>
            サインアップ
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg">
        <Box my={4}>{props.children}</Box>
      </Container>
    </>
  )
}
