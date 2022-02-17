import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Page 1</title>
      </Head>
      <div className="text-3xl font-bold underline">
        This is page 1
      </div>
    </div>
  )
}

export default Home
