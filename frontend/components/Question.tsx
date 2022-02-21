import type { NextPage } from "next"
import { useState } from "react"

interface Props {
  changeValue: any
}

const Question: NextPage<Props> = ({ changeValue }) => {
  const [name, setName] = useState('')
  const [options, setOptions] = useState(['', ''])

  const handleChange = (event: any, type: string, index?: number) => {
    if (type === 'Question') {
      setName(event.target.value)
      changeValue(name, 'Question')
    } else {
      setOptions()
      changeValue(name, 'Question')      
    }
  }

  return (
    <div>
      <label>Question</label>
      <input
        type="text"
        value={name}
        onChange={(event) => handleChange(event, 'Question')}
      />
      {options.map((v, i) => { 
        return (
          <div>
            <label>Option {i + 1}</label>
            <input
              type="text"
              value={options[i]}
              onChange={(event) => handleChange(event, 'Option', i)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Question
