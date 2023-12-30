import React from 'react'
import Sidebar from './Sidebar'
import { MdOutlineAbc } from 'react-icons/md'
import { Outlet } from 'react-router-dom'

const RootLayOut = () => {
  return (
    <div>
        <div className='flex gap-x-10'>

        <div className='w-1/12 h-full px-3 py-12 shadow-2xl'>
            <Sidebar/>
        </div>
        <div className='w-11/12 py-12'>
            <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default RootLayOut