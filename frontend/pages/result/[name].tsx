import type { NextPage } from "next"
import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import Image from 'next/image'
import ApexCharts from 'apexcharts'
import SERVER_URL from "../../survey.config"

const Read: NextPage = ({ survey }: any) => {
  const { data: session } = useSession()


  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/4 p-5 flex justify-center flex-col">
        {survey.title}
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
