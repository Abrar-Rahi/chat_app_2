import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import pp from "../assets/pp.png"
import { getDatabase, ref, onValue,set,push } from "firebase/database";
import { useSelector } from 'react-redux';
import Button from './Button';

const Chat = () => {
  const db = getDatabase();
  let userInfo = useSelector(state=>state.userInfo.value)
  let [myGroupList, setMyGroupList] = useState([])
  let [groupReq, setGroupReq] = useState([])
  let [checkPopup, setCheckPopup] = useState(false)

  useEffect(()=>{
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
      if(userInfo.uid == item.val().adminId){

        arr.push({...item.val(), groupId: item.key})
      }
     })
     setMyGroupList(arr)
  });
  },[])


  let handleCheckGroupRequest = (Gitem)=>{
    setCheckPopup(true)
    const groupreqRef = ref(db, 'grouprequest');
    onValue(groupreqRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
      if(Gitem.groupId == item.val().groupId){

        arr.push({...item.val(), grouprequestId: item.key})
      }
     })
     setGroupReq(arr)
  });
  }


  return (
    <div>
        <div className='flex justify-between items-center '>
            <h4 className='font-inter font-semibold text-primary text-2xl'>My Group</h4>
            {checkPopup&&
            <div className='' onClick={()=>setCheckPopup(false)}>
            <Button name="Back" />
          </div>}
            <BsThreeDotsVertical />
          </div>
          <input type="text" className='px-3 py-2 w-full border border-solid border-strok rounded-lg mt-4 mb-5  ' placeholder='Search'/>
        {checkPopup ?
          
          <>
          {groupReq.map(item=>(
             <div className='flex gap-x-2 items-center mb-4'>
             <img src={item.whoJoinPic} className='w-12 h-12 rounded-full'/>
             <h5 className='font-inter font-semibold text-dark text-lg'>{item.whoJoin}</h5>
          <div className=''>
            <Button name="accept" />
          </div>
          </div>
          ))}
          </>
        :
        
          myGroupList.map(item=>(
          <div className='flex gap-x-2 items-center mb-4'>
             <img src={item.groupPic} className='w-12 h-12 rounded-full'/>
             <h5 className='font-inter font-semibold text-dark text-lg'>{item.groupName}</h5>
          <div className='' onClick={()=>handleCheckGroupRequest(item)}>
            <Button name="Check Request" />
          </div>
          </div>
          ))
        }
          
    </div>
  )
}

export default Chat