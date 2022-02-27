import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import SERVER_URL from "../survey.config"

const Read: NextPage = ({ survey }: any) => {
  const { data: session } = useSession()
  const [answer, setAnswer] = useState<any>([]) 

  const handleChange = (event: any, qi: number) => {
    const newArr = [...answer]
    newArr[qi] = event.target.value
    setAnswer(newArr)
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    console.log(answer, 'submit')
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
        {session ? 
          <section>
            {survey.questions.map((qv: any, qi: number) => {
              return (
                <div key={qi}>
                  <h1 className="my-6 text-2xl font-bold">{qi + 1}. {qv.question}</h1>
                  {qv.options.map((ov: any, oi: number) => {
                    return (
                      <div key={oi}>
                        <input type="radio" value={ov} id={`radio-${oi}`} name={`radio-group-${qi}`} onChange={(event)=>handleChange(event, qi)}/>
                        <label htmlFor={`radio-${oi}`}>{ov}</label>
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <button className="my-6 h-12 w-full border-2 bg-slate-400" type="submit">설문 제출하기</button>
          </section> 
          : 
          <div>            
            <button className="my-6 h-12 w-full border-2 bg-slate-400" type="button" onClick={()=>signIn('google')}>구글 로그인 후 설문시작하기</button>
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
