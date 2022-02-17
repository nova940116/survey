import type { NextPage } from 'next'
import Modal from '../components/modal'

const Create: NextPage = () => {
  return (
    <>
    <div className="flex justify-center w-screen h-screen">
      <div className="flex items-center flex-col w-9/12">
        <h1 className="p-3">설문조사 작성 폼📄</h1>

        <button className="bg-indigo-500 text-white p-2">질문 추가하기</button>
    
        <form>
          <input 
            type="text" 
            className="w-96 border-solid border-2 border-indigo-600"
            placeholder="문항 제목을 입력해주세요"
          />
        </form>
      </div>
    </div>
              <Modal />
    </>

  )
}

export default Create
