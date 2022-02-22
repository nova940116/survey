
import { NextPage } from "next"
import { useState } from "react"
import { useInput } from "../hooks/useInput"

const Create: NextPage = () => {
  const name = useInput("")
  const title = useInput("")
  const details = useInput("")

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
    // const response = fetch('https://')
    console.log(survey, '@')
  }

  return (
    <div className="flex justify-center">
      <form className="w-full sm:w-2/4 p-5 flex justify-center flex-col" onSubmit={handleSubmit}>
        <h1 className="my-6 text-2xl font-bold">설문조사 작성 폼📄</h1>
        <div>
          <label className="block my-2">Survey Name</label>
          <input
            className="w-full border-2 p-1"
            type="text"
            placeholder="Please enter name(unique)"
            {...name}
          />
          <label className="block my-2">Survey Title</label>
          <input
            className="w-full border-2 p-1"
            type="text"
            placeholder="Please enter title"
            {...title}
          />
          <label className="block my-2">Survey Details</label>          
          <textarea
            className="w-full border-2 p-1 h-16"
            placeholder="Please enter details"
            {...details}
          />
        </div>

        {survey.map((qv: any, qi: number) => {
          return (
            <div key={qi}>
              <label className="block my-2">Question {qi + 1}</label>
              <textarea
                className="w-full border-2 p-1 h-16"
                value={survey[qi].question}
                onChange={(event) => handleChange(event, 'QUESTION', qi)}
                placeholder="Please enter your question"
              />
              {qv.options.map((ov: string, oi: number) => {
                return (
                  <div key={oi}>
                    <label className="block my-2">Option {oi + 1}</label>
                    <input
                      className="w-full border-2 p-1"
                      value={ov}
                      onChange={(event) => handleChange(event, 'OPTION', qi, oi)}
                      placeholder="Please enter your option"
                    />
                  </div>
                )
              })}
              <button className="my-6 h-12 w-full border-2 bg-slate-400" onClick={() => addItem(qi)}>항목 추가하기</button>
              <div className="border-b"></div>
            </div>
          )
        })}
        <button type="button" className="border-2 my-4 h-12 bg-slate-400" onClick={addQuestion}>질문 추가하기</button>
        <button type="submit" className="border-2 my-4 h-12 bg-slate-400">제출하기</button>
      </form>
    </div>
  );
}

export default Create
