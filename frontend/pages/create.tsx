import type { NextPage } from "next"
import BasicInput from "../components/BasicInput"
import Question from "../components/Question"
import { useState } from "react"

interface Survey {
  name: string,
  title: string,
  description: string,
  items: any[]
}

const Create: NextPage = () => {

  const [survey, setSurvey] = useState<Survey>({
    name: '',
    title: '',
    description: '',
    items: [
      { question: '', options: ['', ''] }
    ]
  })

  const CreateSurvey = (event: any) => {
    event.preventDefault()
  }

  const handleSuryey = () => {

  }

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="flex items-center flex-col w-screen md:w-9/12">
        <form className="w-screen md:w-9/12 p-2" onSubmit={CreateSurvey}>
          <Question handleSuryey={handleSuryey} />
        </form>
      </div>
    </div>
  )
}

export default Create
