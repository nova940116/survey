import type { NextPage } from "next"
import { useState } from "react"
import BasicInput from "../components/BasicInput"

interface Props {
  handleSuryey: any
}

const Question: NextPage<Props> = ({ handleSuryey }) => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])

  const optionChange = (event: any, index: number) => {
    options[index] = event.target.value
  }

  const addOption = () => {
    const newOptions = options.concat([''])
    setOptions(newOptions)
  }

  return (
    <div>
      <BasicInput
        width="w-full"
        placeholder="질문을 입력하세요"
        onChange={(e: any)=>setQuestion(e.target.value)}
      />
      {options.map((v, i) => {
        return (
          <BasicInput
            width="w-full"
            key={i}
            placeholder="항목을 입력하세요"
            onChange={(e: any)=>optionChange(e, i)}
          />
        )
      })}
      <button onClick={addOption}>항목 추가</button>
    </div>
  )
}

export default Question
