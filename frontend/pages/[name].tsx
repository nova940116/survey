import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SERVER_URL from '../survey.config'

const Read: NextPage = () => {
  const router = useRouter()  
  const [survey, setSurvey] = useState<any>({})
  useEffect(() => {
    (async () => {
      if(router.query.name) {
        const survey = await fetch(`${SERVER_URL}/chicken`).then(r => r.json())
        console.log(survey.Item, router.query.name, '@rq')
        setSurvey(survey.Item)
      }
    })()
  }, [router.query.name])
  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-2/4 p-5 flex justify-center flex-col">
        <h1>{survey.title}</h1>
      </div>
    </div>
  )
}

export default Read
