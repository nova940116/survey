
import { NextPage } from "next"
import { useState } from "react"
import Question from "../components/Question"

const Create: NextPage = () => {
  const [questions, setQuestions] = useState<any>([])

  const changeValue = (value: string, type: string) => {
    if (type === 'Question') {
      setQuestions([{ question: value }])
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(questions, '@')
  }

  return (
    <div className="flex justify-center">
      <form className="w-full sm:w-2/4 p-5 flex justify-center flex-col" onSubmit={handleSubmit}>
        <h1>설문조사 작성 폼📄</h1>
        <Question changeValue={changeValue} />
        <button className="border-2 my-4 h-10 bg-slate-400" type="submit">제출</button>
      </form>
    </div>
  );
}

export default Create
