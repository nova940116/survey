import type { NextPage } from "next"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import Image from 'next/image'
import SERVER_URL from "../../survey.config"
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Result: NextPage = ({ survey }: any) => {
  const router = useRouter()
  const [charts, setCharts] = useState<any>([])  

  useEffect(() => {
    (async () => {
      const session = await getSession()
      if(router.query.name) {
        const res = await fetch(`${SERVER_URL}/survey/isSubmit?name=${router.query.name}&email=${session?.user?.email}`).then(r => r.json())
        if(!res.Item) {
          alert('설문을 먼저 작성한 후에 결과를 확인해주세요')
          router.push(`/${router.query.name}`)
        }        
      }

      const newArr = [...charts]
      survey.questions.map((v: any, i: number) => {
        console.log(v.options)
        newArr.push({
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [...v.options]
            }
          },
          series: [
            {
              name: `series-${i+1}`,
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        })
      })
      setCharts(newArr)      
    })()
  }, [router.query.name])

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/4 p-5 flex justify-center flex-col">
        <h1 className="my-6 text-4xl font-bold">{survey.title}</h1>

        {survey.questions.map((v: any, i: number) => {
          if(charts.length) {
            return (
              <div key={i}>
                <Chart 
                  options={charts[i].options}
                  series={charts[i].series}
                  type="bar"
                  width={500}
                />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }: any) {
  const res = await fetch(`${SERVER_URL}/${params.name}`).then(r => r.json())
  const survey = res.Item

  return {
    props: { survey }
  }
}

export default Result
