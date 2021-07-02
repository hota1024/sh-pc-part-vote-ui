import { NextPage } from 'next'
import { useAuth } from '../hooks/useAuth'
import { MainLayout } from '../layouts/MainLayout'
import { PageHead } from '../components/PageHead'
import { PartTypeCard } from '../components/PartTypeCard'
import { Box, Grid } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { PartType, PartTypes } from '../types/Part'
import { Container } from '@material-ui/core'
import { Typography } from '@material-ui/core'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const { jwtChecking } = useAuth()

  return (
    <>
      <PageHead title="ホーム" />

      <MainLayout>
        <Container maxWidth="md">
          <Alert severity="info">
            <AlertTitle>このサイトについて</AlertTitle>
            パーツごとにみんなが好きなものを投票し、それをランキング形式で発表するサイトです。
            <br />
            凝りっ凝りの変態玄人さんからド素人さんまで、どうぞご活用ください。
          </Alert>
        </Container>
        <Box my={3}>
          <Typography variant="h5" align="center">
            パーツを選ぶ
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {PartTypes.map((type: PartType) => (
            <Grid key={type} item xs={12} md={4}>
              <PartTypeCard loading={jwtChecking} type={type} />
            </Grid>
          ))}
        </Grid>
      </MainLayout>
    </>
  )
}

export default HomePage
