import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from "react"

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Page 1</title>
      </Head>
      <div className="text-3xl font-bold underline">
        설문리스트
      </div>
    </div>
  )
}

export default Home
