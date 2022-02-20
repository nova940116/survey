
import { NextPage } from "next"
import * as React from "react"
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form"

type FormValues = {
  questions: {
    question: string
    options: string[]
  }[]
}

// const Total = ({ control }: { control: Control<FormValues> }) => {
//   const formValues = useWatch({
//     name: "questions",
//     control
//   });
//   const total = formValues.reduce(
//     (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
//     0
//   );
//   return <p>Total Amount: {total}</p>;
// };

const Create: NextPage = () => {
  const { register, control, handleSubmit, formState: { errors }} = useForm<FormValues>({
    defaultValues: {
      questions: [{ question: '', options: ['', '']}]
    },
    mode: "onBlur"
  })

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control
  })
  
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="flex justify-center">
      <form className="w-full sm:w-2/4 p-5 flex justify-center flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h1>설문조사 작성 폼📄</h1>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <label className="py-2 block text-sm font-medium text-gray-700">Question {index + 1}</label>
              <input
                className="border-2 w-full"
                placeholder="질문"
                {...register(`questions.${index}.question`)}
              />
              {field.options.map((v, i) => {
                return (
                  <div key={i}>
                    <label className="py-2 block text-sm font-medium text-gray-700">Items {i + 1}</label>
                    <input
                      className="border-2 w-full"
                      placeholder="항목"
                      {...register(`questions.${index}.options.${i}`)}
                    />
                  </div>
                )
              })}
              <button
                type="button"
                className="w-full border-2 my-4 h-10 bg-slate-400"
                onClick={() => append({ options: fields[index].options.concat(['']) })}
              >
                항목 추가하기
              </button>
              <div className="py-2 border-b-2"></div>
            </div>
          );
        })}

        {/* <Total control={control} /> */}

        <button
          type="button"
          className="border-2 my-4 h-10 bg-slate-400"
          onClick={() => append({ question: '', options: ['', ''] })}
        >
          질문 추가하기
        </button>
        <button className="border-2 my-4 h-10 bg-slate-400" type="submit">제출</button>
      </form>
    </div>
  );
}

export default Create
