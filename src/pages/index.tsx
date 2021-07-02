import { Button } from '@material-ui/core'
import { NextPage } from 'next'
import Head from 'next/head'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>home - sh-pc-part-vote-ui</title>
      </Head>

      <div>
        <Button color="primary" variant="contained">
          hello world
        </Button>
      </div>
    </>
  )
}

export default HomePage
