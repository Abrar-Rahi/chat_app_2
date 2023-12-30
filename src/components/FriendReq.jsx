import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import pp from "../assets/pp.png"
import { useEffect, useState } from 'react'
import { getDatabase, ref, onValue,set,push,remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Button from './Button';

const FriendReq = () => {
  const db = getDatabase();
  let userInfo = useSelector(state=>state.userInfo.value)
  let [frReqLish,setFeReqList]=useState([])

  useEffect(()=>{
    const friendRequestRef = ref(db, 'friendRequest');
    onValue(friendRequestRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
      if(userInfo.uid == item.val().whoReceiveId){

        arr.push({...item.val(), frId:item.key})
      }
     })
     setFeReqList(arr)
  });
  },[])

  let handleAcceptFriendRequest =(item)=>{
    set(push(ref(db, 'friends')), {
      ...item,
      whoReceivePhoto : userInfo.photoURL
    }).then(()=>{
      remove(ref(db, 'friendRequest/' + item.frId))
    })
  }

  let handleDeleteFriendRequest =(item)=>{
    
      remove(ref(db, 'friendRequest/' + item.frId))
    
  }


  return (
    <div>
       <div className='flex justify-between items-center mb-5'>
            <h4 className='font-inter font-semibold text-primary text-2xl'>Friend Request</h4>
            <BsThreeDotsVertical />
          </div>
          {frReqLish.map(item=>(

          <div className='flex gap-x-2 items-center mb-4'>
             <img src={item.whoSendPhoto} className='w-12 h-12 rounded-full'/>
             <h5 className='font-inter font-semibold text-dark text-lg'>{item.whoSend}</h5>
             <div onClick={()=>handleAcceptFriendRequest(item)}>
              <Button name="Accept"/>
            </div>
             <div onClick={()=>handleDeleteFriendRequest(item)}>
              <Button name="Delete" className="bg-red-500"/>
            </div>
             
          </div>
          ))}

          
    </div>
  )
}

export default FriendReq