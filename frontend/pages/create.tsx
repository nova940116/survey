
import { NextPage } from "next"
import { useState } from "react"

const Create: NextPage = () => {
  const [survey, setSurvey] = useState<any>([
    { question: '', options: ['', '']}
  ])

  const handleChange = (event: any, type: string, qi: number, oi?: any) => {
    const newArr = [...survey]
    type === 'QUESTION' ? newArr[qi].question = event.target.value : newArr[qi].options[oi] = event.target.value
    setSurvey(newArr)
  }

  const addQuestion = () => {
    setSurvey(survey.concat([{ question: '', options: ['', '']}]))
  }

  const addItem = (qi: number) => {
    const newArr = [...survey]
    newArr[qi].options = newArr[qi].options.concat([''])
    setSurvey(newArr)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(survey, '@')
  }

  return (
    <div className="flex justify-center">
      <form className="w-full sm:w-2/4 p-5 flex justify-center flex-col" onSubmit={handleSubmit}>
        <h1>설문조사 작성 폼📄</h1>
        {survey.map((qv: any, qi: number) => {
          return (
            <div key={qi}>
              <label>Question {qi + 1}</label>
              <input
                className="w-full border-2"
                value={survey[qi].question}
                onChange={(event) => handleChange(event, 'QUESTION', qi)}
              />
              {qv.options.map((ov: string, oi: number) => {
                return (
                  <div key={oi}>
                    <label>Option {oi + 1}</label>
                    <input
                      className="w-full border-2"
                      value={ov}
                      onChange={(event) => handleChange(event, 'OPTION', qi, oi)}
                    />
                  </div>
                )
              })}
              <button className="w-full border-2" onClick={()=> addItem(qi)}>항목 추가하기</button>
            </div>
          )
        })}
        <button type="button" className="border-2 my-4 h-10 bg-slate-400" onClick={addQuestion}>질문 추가하기</button>
        <button type="submit" className="border-2 my-4 h-10 bg-slate-400">제출</button>
      </form>
    </div>
  );
}

export default Create
