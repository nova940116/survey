import type { NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import SERVER_URL from "../survey.config"
import Footer from "../components/footer"

const Read: NextPage = ({ surveys }: any) => {

  return (
    <div className="flex justify-center flex-col">
      <Head>
        <title>노바의 설문조사</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="og:title" property="og:title" content="노바의 설문조사" />
        <meta name="og:description" property="og:description" content="각종 설문조사를 진행하고 그 결과는 어떤지 확인해보세요" />
        <meta name="og:url" property="og:url" content="https://survey.novauniverse.me" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="노바의 설문조사" />
        <meta name="author" content="nova" />        
        <meta name="url" content="https://survey.novauniverse.me" />
        <meta name="description" content="각종 설문조사를 진행하고 그 결과는 어떤지 확인해보세요" />
        <meta name="keywords" content="설문조사" />
        <link rel="shortcut icon" type="image/x-icon" href="https://survey.novauniverse.me/logo.png" />
      </Head>
      <div className="w-full h-680 p-5 flex flex-col">
        <section className="mb-2 pb-6 border-b-2">
            <h1 className="my-6 text-4xl font-bold">노바의 설문조사 플랫폼</h1>
          <blockquote className="text-xl">각종 설문조사를 진행하고 그 결과는 어떤지 확인해보세요 :)</blockquote>
        </section>
        <section>
          <h3 className="text-xl">설문조사 리스트</h3>
          {surveys.map((v: any, i: number) => {
            return (
            <Link href={`/${v.name}`} key={i}>
              <h3 className="my-6 text-2xl font-bold underline cursor-pointer">{v.title}</h3>
            </Link>
            )
          })}
        </section>
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${SERVER_URL}/surveys`).then(r => r.json())
  const surveys = res.Items

  return {
    props: {
      surveys
    }
  }
}

export default Read
