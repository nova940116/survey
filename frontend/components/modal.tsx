import type { NextPage } from 'next'

const Modal: NextPage = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-brightness-50 flex justify-center items-center">
      <div className="bg-white w-60 h-40 flex justify-center items-center">
        <p className="">로딩 중 입니다...</p>
      </div>
    </div>
  )
}

export default Modal
