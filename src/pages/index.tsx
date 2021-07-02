import { Button } from '@material-ui/core'
import { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '../layouts/MainLayout'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>home - sh-pc-part-vote-ui</title>
      </Head>

      <MainLayout>
        <Button color="primary" variant="contained">
          hello world
        </Button>
      </MainLayout>
    </>
  )
}

export default HomePage
