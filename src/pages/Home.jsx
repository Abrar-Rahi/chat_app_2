import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Chat from '../components/Chat';
import Group from '../components/Group';
import Friends from '../components/Friends';
import People from '../components/People';
import FriendReq from '../components/FriendReq';
import BlockList from '../components/BlockList';


const Home = () => {
  
  let userInfo = useSelector(state=>state.userInfo.value)
  

 

  useEffect(()=>{
    if(userInfo == null){
      navigate("/")
    }
  },[])
  return (
    <div className='flex gap-x-10 gap-y-10 flex-wrap'>
      <div className='w-[31%] shadow-lg rounded-sm p-4 overflow-y-scroll h-[500px]'>
        <Chat/>
      </div>
      <div className='w-[31%] shadow-lg rounded-sm p-4 overflow-y-scroll h-[500px]'>
        <Group/>
      </div>
      <div className='w-[31%] shadow-lg rounded-sm p-4 overflow-y-scroll h-[500px]'>
        <Friends/>
      </div>
      <div className='w-[31%] shadow-lg rounded-sm p-4 overflow-y-scroll h-[500px]'>
        <People/>
      </div>
      <div className='w-[31%] shadow-lg rounded-sm p-4 overflow-y-scroll h-[500px]'>
        <FriendReq/>
      </div>
      <div className='w-[31%] shadow-lg rounded-sm p-4 overflow-y-scroll h-[500px]'>
        <BlockList/>
      </div>
    </div>
  )
}

export default Home