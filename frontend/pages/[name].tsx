import type { NextPage } from "next"
import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import Image from 'next/image'
import SERVER_URL from "../survey.config"

const Read: NextPage = ({ survey }: any) => {
  const { data: session } = useSession()
  const [answer, setAnswer] = useState<string []>([]) 

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
    if(session?.user?.email) {
      const res = await fetch(`${SERVER_URL}/survey/isSubmit?name=${survey.name}&email=${session.user.email}`).then(r => r.json())
      if(res.Item) {
        alert('이미 설문을 제출하셨습니다')
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
    response === 'YES' ? alert('설문 조사 제출이 완료되었습니다') : alert('설문조사 제출에 실패했습니다')
  }

  return (
    <div className="flex justify-center">
      <form className="w-full lg:w-2/4 p-5 flex justify-center flex-col">
        <section className="mb-2 pb-6 border-b-2">
          <h1 className="my-6 text-4xl font-bold">{survey.title}</h1>
          <blockquote className="text-xl">{survey.details}</blockquote>
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
            <button className="bg-slate-900 text-white my-6 h-14 w-full border-2 font-bold" type="button" onClick={checkItems}>설문 제출하기</button>
          </section> 
          : 
          <div>            
            <button className="flex justify-center items-center my-6 h-12 w-full border-2 bg-white" type="button" onClick={()=>signIn('google')}>
              <Image 
                src="/btn_google_light_normal_ios.svg" 
                width={45}
                height={45} 
              />
              <p>구글 로그인 후 설문시작하기</p>
            </button>
          </div>
        }
        </form>
    </div>
  )
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(`${SERVER_URL}/${params.name}`).then(r => r.json())
  const survey = res.Item

  return {
    props: {
      survey
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${SERVER_URL}/surveys`).then(r => r.json())
  const survey: any = []
  res.Items.map((v: any) => { survey.push({ params: { name: v.name } }) })
  return {
    paths: [...survey],
    fallback: false
  }
}

export default Read
