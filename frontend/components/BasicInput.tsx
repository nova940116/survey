import type { NextPage } from "next"

interface Props {
  placeholder?: string
  width: string
  onChange?: any,
  value?: string
}

const BasicInput: NextPage<Props> = ({ placeholder, width, onChange, value }) => {
  return (
    <input
      type="text"
      className={`${width} p-1.5 border-solid border-2 border-indigo-600`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}

export default BasicInput
