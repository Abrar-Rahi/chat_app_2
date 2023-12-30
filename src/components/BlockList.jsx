import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import pp from "../assets/pp.png"
import { useEffect, useState } from 'react'
import { getDatabase, ref, onValue,set,push,remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Button from './Button';

const BlockList = () => {
  const db = getDatabase();
let userInfo = useSelector(state=>state.userInfo.value)
let [blockLish,setBlockList]=useState([])

  useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
      if(userInfo.uid == item.val().whoBlockById || userInfo.uid == item.val().whoBlockedId){

        arr.push({...item.val(), blockId:item.key})
      }
     })
     setBlockList(arr)
  });
  },[])

  let handleUnblock = (item)=>{
     
     set(push(ref(db, 'friends')), {
      whoReceive : item.whoBlocked,
      whoReceiveId : item.whoBlockedId,
      whoReceivePhoto :item.whoBlockedPic,
      whoSend : userInfo.displayName,
      whoSendId :  userInfo.uid,
      whoSendPhoto : userInfo.photoURL,
      
    }).then(()=>{
      remove(ref(db, 'block/' + item.blockId))
    })

  }
  



  return (
    <div>
       <div className='flex justify-between items-center mb-5'>
            <h4 className='font-inter font-semibold text-primary text-2xl'>Block List</h4>
            <BsThreeDotsVertical />
          </div>
          
          {blockLish.map(item=>(

          <div className='flex gap-x-2 items-center mb-4'>
          {userInfo.uid == item.whoBlockById ?
            <>
             <img src={item.whoBlockedPic} className='w-12 h-12 rounded-full'/>
             <h5 className='font-inter font-semibold text-dark text-lg'>{item.whoBlocked}</h5>
             <div onClick={()=>handleUnblock(item)}>
              <Button name="UnBlock" className="bg-green-500"/>
            </div>
            </>
          :
            <>
             <img src={item.whoBlockByPic} className='w-12 h-12 rounded-full'/>
             <h5 className='font-inter font-semibold text-dark text-lg'>{item.whoBlockBy}</h5>
             <div>
              <Button name={`${item.whoBlockBy} blocked by you`} className="bg-red-500" type="disabled"/>
            </div>
            </>
          
          }
          </div>
          ))}
         
    </div>
  )
}

export default BlockList