import {
  Container,
  Divider,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  LinearProgress,
} from '@material-ui/core'
import { Alert, AlertTitle, Skeleton } from '@material-ui/lab'
import axios from 'axios'
import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import { client } from '../client/client'
import { useAuth } from '../hooks/useAuth'
import { MainLayout } from '../layouts/MainLayout'
import { jwtAtom } from '../store/jwt'
import { LoginRes } from '../types/LoginRes'

/**
 * Signup page.
 */
export const SignupPage: NextPage = () => {
  const { jwtChecking, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<unknown>()
  const [, setJwt] = useAtom(jwtAtom)
  const router = useRouter()

  if (user) {
    router.replace('/')
    return <></>
  }

  const onPostClick = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await client.post<LoginRes>('auth/login', {
        email,
        password,
      })

      setJwt(data.token)

      await router.push('/')
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data)
      }
    }

    setLoading(false)
  }

  return (
    <>
      <MainLayout>
        <Container maxWidth="sm">
          <Card>
            {jwtChecking ? (
              <Skeleton variant="rect" height={300} />
            ) : (
              <>
                {loading && <LinearProgress />}
                <CardHeader
                  title="サインイン"
                  subheader="PCパーツ総選挙のアカウントでログインします。"
                />
                <Divider />
                <CardContent>
                  {error && (
                    <Alert severity="error" style={{ overflow: 'scroll' }}>
                      <AlertTitle>エラーが発生しました。</AlertTitle>
                      <pre>{JSON.stringify(error, void 0, 2)}</pre>
                    </Alert>
                  )}
                  <Box my={1}>
                    <TextField
                      name="email"
                      label="メールアドレス"
                      variant="filled"
                      fullWidth
                      autoFocus
                      value={email}
                      onChange={({ target: { value } }) => setEmail(value)}
                      disabled={loading}
                    />
                  </Box>
                  <Box my={1}>
                    <TextField
                      name="password"
                      label="パスワード"
                      type="password"
                      variant="filled"
                      fullWidth
                      value={password}
                      onChange={({ target: { value } }) => setPassword(value)}
                      disabled={loading}
                    />
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    disableElevation
                    color="primary"
                    disabled={loading}
                    onClick={onPostClick}
                  >
                    ログイン
                  </Button>
                </CardActions>
              </>
            )}
          </Card>
        </Container>
      </MainLayout>
    </>
  )
}

export default SignupPage
