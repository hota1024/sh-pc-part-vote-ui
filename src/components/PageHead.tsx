import Head from 'next/head'

/**
 * PageHead props.
 */
export type PageHeadProps = {
  title: string
}

/**
 * PageHead component.
 */
export const PageHead: React.VFC<PageHeadProps> = (props) => {
  const { title } = props

  return (
    <>
      <Head>
        <title>{title} - PCパーツ総選挙</title>
      </Head>
    </>
  )
}
