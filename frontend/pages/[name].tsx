import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import Image from 'next/image'
import Head from "next/head"
import SERVER_URL from "../survey.config"
import Footer from "../components/footer"

const Read: NextPage = ({ survey }: any) => {
  const { data: session } = useSession()
  const [answer, setAnswer] = useState<string []>([]) 
  const router = useRouter()

  useEffect(() => {
    (async() => {
      if(session?.user?.email) {
        const res = await fetch(`${SERVER_URL}/survey/isSubmit?name=${survey.name}&email=${session.user.email}`).then(r => r.json())
        if(res.Item) {
          alert('이미 설문을 제출하셨습니다')
          router.push(`result/${router.query.name}`)
          return
        }
      } 
    })()
  }, [session])

  const handleChange = (event: any, qi: number) => {
    const newArr = [...answer]
    newArr[qi] = event.target.value
    setAnswer(newArr)
  }
  const checkItems = async () => {
    if(answer.length !== survey.questions.length) {
      alert('설문 항목을 모두 체크해주세요')
      return
    }
    for(let v of answer) {
      if(!v) {
        alert('설문 항목을 모두 체크해주세요') 
        return
      }
    }
    handleSubmit()
  }
  const handleSubmit = async () => {
    const request = {
      name: survey.name,
      email: session?.user?.email,
      answer: answer
    }
    const response = await fetch(`${SERVER_URL}/submit`, { method: 'POST', body: JSON.stringify(request)}).then(r=> r.json())
    if(response === 'YES') {
      alert('설문 조사 제출이 완료되었습니다')
      router.push(`result/${router.query.name}`)
    } else alert('설문조사 제출에 실패했습니다')
  }

  return (
    <div className="flex justify-center flex-wrap items-center h-screen">
      <Head>
        <title>작성 | {survey.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="og:title" property="og:title" content={survey.title} />
        <meta name="og:description" property="og:description" content={survey.details} />
        <meta name="og:url" property="og:url" content={`https://survey.novauniverse.me/${router.query.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="노바의 설문조사" />
        <meta name="author" content="nova" />        
        <meta name="url" content={`https://survey.novauniverse.me/${router.query.name}`} />
        <meta name="description" content={survey.details} />
        <meta name="keywords" content="설문조사" />
        <link rel="shortcut icon" type="image/x-icon" href="https://survey.novauniverse.me/logo.png" />
      </Head>
      <form className="w-full lg:w-2/4 p-5">
        <section className="mb-2 pb-6 border-b-2">
          <h1 className="my-6 text-4xl font-bold">{survey.title}</h1>
          <blockquote className="text-lg white whitespace-pre-wrap">{survey.details}</blockquote>
        </section>
        {session ? 
          <section>
            {survey.questions.map((qv: any, qi: number) => {
              return (
                <div key={qi}>
                  <h1 className="my-6 text-2xl font-bold">{qi + 1}. {qv.question}</h1>
                  {qv.options.map((ov: any, oi: number) => {
                    return (
                      <div key={oi}>
                        <input type="radio" value={ov} id={`radio-group-${qi}-radio-${oi}`} name={`radio-group-${qi}`} onChange={(event)=>handleChange(event, qi)}/>
                        <label className="ml-2" htmlFor={`radio-group-${qi}-radio-${oi}`}>{ov}</label>
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <button 
              className="bg-slate-900 text-white my-6 h-14 w-full font-bold hover:bg-slate-700" 
              type="button" 
              onClick={checkItems}
            >
              설문 제출하기
            </button>
          </section> 
          : 
          <div>            
            <p>✅ 중복 설문을 방지하기 위해 구글 로그인이 필요해요</p>
            <p>✅ 로그인 정보(이메일)는 중복 설문을 방지하기 위한 용도로만 사용되고 있어요</p>
            <button className="flex justify-center items-center my-6 h-12 w-full border-2 bg-white" type="button" onClick={()=>signIn('google')}>
              <Image 
                src="/btn_google_light_normal_ios.svg" 
                width={45}
                height={45} 
              />
              <p className="mr-4">구글 로그인 후 설문시작하기</p>
            </button>
          </div>
        }
        </form>
        <Footer />
    </div>
  )
}

export async function getServerSideProps({ params }: any) {
  const res = await fetch(`${SERVER_URL}/${params.name}`).then(r => r.json())
  const survey = res.Item

  return {
    props: {
      survey
    }
  }
}

export default Read
