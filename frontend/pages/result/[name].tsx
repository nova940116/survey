import type { NextPage } from "next"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import Image from 'next/image'
import ApexCharts from 'apexcharts'
import SERVER_URL from "../../survey.config"

const Read: NextPage = ({ survey }: any) => {
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const session = await getSession()
      if(router.query.name) {
        const res = await fetch(`${SERVER_URL}/survey/isSubmit?name=${router.query.name}&email=${session?.user?.email}`).then(r => r.json())
        if(!res.Item) {
          alert('설문을 먼저 작성한 후에 결과를 확인해주세요')
          router.push(`/${router.query.name}`)
        }        
      }
    })()
  }, [router.query.name])

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/4 p-5 flex justify-center flex-col">
        <h1 className="my-6 text-4xl font-bold">{survey.title}</h1>
      </div>
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
