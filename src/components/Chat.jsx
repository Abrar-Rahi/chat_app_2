import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import pp from "../assets/pp.png"

const Chat = () => {
  return (
    <div>
        <div className='flex justify-between items-center '>
            <h4 className='font-inter font-semibold text-primary text-2xl'>Chat</h4>
            <BsThreeDotsVertical />
          </div>
          <input type="text" className='px-3 py-2 w-full border border-solid border-strok rounded-lg mt-4 mb-5  ' placeholder='Search'/>

          <div className='flex gap-x-2 items-center mb-4'>
             <img src={pp} className='w-12 h-12 rounded-full'/>
             <h5 className='font-inter font-semibold text-dark text-lg'>Savannah Nguyen</h5>
             <p className='font-inter font-normal text-primary text-lg last:ml-10'>Add</p>
          </div>
          <div className='flex gap-x-2 items-center mb-4'>
             <img src={pp} className='w-12 h-12 rounded-full'/>
             <h5 className='font-inter font-semibold text-dark text-lg'>Savannah Nguyen</h5>
             <p className='font-inter font-normal text-primary text-lg last:ml-10'>Add</p>
          </div>
    </div>
  )
}

export default Chat