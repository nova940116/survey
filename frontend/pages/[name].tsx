import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import SERVER_URL from "../survey.config"

const Read: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()  
  const [survey, setSurvey] = useState<any>({
    title: '',
    details: '',
    questions: []
  })
  useEffect(() => {
    (async () => {
      if(router.query.name) {
        const survey = await fetch(`${SERVER_URL}/${router.query.name}`).then(r => r.json())
        setSurvey(survey.Item)
      }
    })()
  }, [router.query.name])

  const handleClick = (event: any) => {
    signIn('google')
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    console.log('submit')
    // const response = await fetch(`${SERVER_URL}/create`, { method: 'POST', body: JSON.stringify(request)}).then(r=> r.json())
    // response === 'YES' ? alert('설문 조사가 등록되었습니다') : alert('설문조사 등록에 실패했습니다')
  }

  return (
    <div className="flex justify-center">
      <form className="w-full sm:w-2/4 p-5 flex justify-center flex-col" onSubmit={handleSubmit}>
        <section>
          <h1 className="my-6 text-4xl font-bold">{survey.title}</h1>
          <blockquote>{survey.details}</blockquote>
        </section>
        {survey.questions.map((qv: any, qi: number) => {
          return (
            <section key={qi}>
              <h1 className="my-6 text-2xl font-bold">{qi + 1}. {qv.question}</h1>
              {qv.options.map((ov: any, oi: number) => {
                return (
                  <div key={oi}>
                    <input type="radio" value={ov} id={`radio-${oi}`} name={`radio-group-${qi}`} />
                    <label htmlFor={`radio-${oi}`}>{ov}</label>
                  </div>
                )
              })}
            </section>
          )
        })}
        {session 
        ? <button className="my-6 h-12 w-full border-2 bg-slate-400" type="submit">설문 제출하기</button>
        : <button className="my-6 h-12 w-full border-2 bg-slate-400" type="button" onClick={handleClick}>구글 로그인 후 제출하기</button>
        }
        </form>
    </div>
  )
}

export default Read
