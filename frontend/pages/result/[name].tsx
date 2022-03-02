import type { NextPage } from "next"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import Head from "next/head"
import SERVER_URL from "../../survey.config"
import dynamic from 'next/dynamic'
import Modal from "../../components/modal"
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Result: NextPage = ({ survey, result }: any) => {
  const router = useRouter()
  const [charts, setCharts] = useState<any>([])
  const [answer, setAnswer] = useState<any>([])
  const [isSurvey, setIsSurvey] = useState<boolean>(true)  

  useEffect(() => {
    (async () => {
      const session = await getSession()
      if(router.query.name) {
        const res = await fetch(`${SERVER_URL}/survey/isSubmit?name=${router.query.name}&email=${session?.user?.email}`).then(r => r.json())
        if(!res.Item) {
          alert('설문을 먼저 작성한 후에 결과를 확인해주세요')
          setIsSurvey(false)
          router.push(`/${router.query.name}`)
        }        
      }

      const newArr = [...charts]
      const newArr2 = [...answer]
      const answerNumber: any = []
      const answerStore: any = []

      survey.questions.map((v: any) => {
        answerStore.push([])
        answerNumber.push([])
      })

      result.Items.map((rv: any, ri: number) => {
        rv.answer.map((av: string, ai: number) => {
          answerStore[ai].push(av)
        })
      })

      survey.questions.map((v: any, i: number) => {
        v.options.map((v2: string, i2: number) => {
          answerNumber[i].push(answerStore[i].filter((v3: string) => v3 === v2).length)
        })
      })

      survey.questions.map((v: any, i: number) => {
        newArr2.push(answerNumber[i].indexOf(Math.max(...answerNumber[i])))
        setAnswer(newArr2)
        newArr.push({
          options: {
            chart: {
              type: "bar",
              width: "100%",
        
            },
            colors: ['#000'],
            xaxis: {
              categories: [...v.options]
            },
            plotOptions: {
              bar: {
                horizontal: v.options.length > 4 ? true : false,
                borderRadius: 4
              }
            },          
          },
          series: [
            {
              data: answerNumber[i]
            }
          ]
        })
      })
      setCharts(newArr)    
    })()
  }, [router.query.name])

  return (
    <div className="flex justify-center">
      <Head>
        <title>결과 | {survey.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="og:title" property="og:title" content={survey.title} />
        <meta name="og:description" property="og:description" content={survey.details} />
        <meta name="og:url" property="og:url" content={`https://survey.novauniverse.me/${router.query.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="노바의 설문조사 플랫폼" />
        <meta name="author" content="nova" />
        <meta name="url" content={`https://survey.novauniverse.me/${router.query.name}`} />
        <meta name="description" content={survey.details} />
        <meta name="keywords" content="설문조사, 설문조사작성, 리포트, 설문조사 리포트" />
      </Head>
      {survey.questions.length ?       
        <div className="w-full lg:w-2/4 p-5 flex justify-center flex-col">
          <h1 className="my-6 text-4xl font-bold">{survey.title}</h1>
          <blockquote className="text-xl">
            현재까지 설문에 참여한 참여자 수는 <span className="text-2xl">{result.Count}</span>명 입니다
          </blockquote>
          {survey.questions.map((v: any, i: number) => {
            if(charts.length && isSurvey) {
              return (
                <div key={i}>
                  <h1 className="my-6 text-2xl font-bold">{i+1}. {v.question}</h1>
                  <h3 className="my-3">{i+1}번 항목에서 사람들이 가장 많이 고른 선택지는 <span className="text-2xl">{v.options[answer[i]]}</span> 입니다</h3>
                  <Chart 
                    options={charts[i].options}
                    series={charts[i].series}
                    type="bar"
                  />
                </div>
              )
            }
          })}
        </div>
      : <Modal />}
    </div>
  )
}

export async function getServerSideProps({ params }: any) {
  const res = await fetch(`${SERVER_URL}/${params.name}`).then(r => r.json())
  const res2 = await fetch(`${SERVER_URL}/result/${params.name}`).then(r => r.json())
  const survey = res.Item
  const result = res2

  return {
    props: { survey, result }
  }
}

export default Result
