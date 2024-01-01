import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import pp from "../assets/pp.png"
import { getDatabase, ref, onValue,set,push } from "firebase/database";
import { useSelector } from 'react-redux';
import Button from './Button';
import { toast } from 'react-toastify';
import moment from 'moment';

const People = () => {
  const db = getDatabase();
  let userInfo = useSelector(state=>state.userInfo.value)
  
  let [userList,setUserList] = useState([])
  let [searchList,setSearchList] = useState([])
  let [evalue,setEvalue] = useState("")
  let [frReq,setFrReq] = useState([])
  let [friends,setFriends] = useState([])
  let [block,setBlock] = useState([])
  
  
  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
      if(userInfo.uid != item.key){
        arr.push({...item.val(), userId: item.key})
      }
     })
     setUserList(arr)
  });
  },[])

  let handleSearch = (e)=>{
    setEvalue(e.target.value)
     let search = userList.filter(item=>item.username.toLowerCase().includes(e.target.value.toLowerCase()))
     setSearchList(search)
     
  }

  let handleAddFriendRequest = (item)=>{
    
    set(push(ref(db, 'friendRequest')), {
      whoSend : userInfo.displayName,
      whoSendId : userInfo.uid,
      whoSendPhoto : userInfo.photoURL,
      whoReceive : item.username,
      whoReceiveId : item.userId,
      sendtime : moment().format('LT')
    }).then(()=>{
      toast("request sended")
    })
    
  }
  useEffect(()=>{
    const friendRequestRef = ref(db, 'friendRequest');
    onValue(friendRequestRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
      arr.push(item.val().whoSendId + item.val().whoReceiveId)
     })
     setFrReq(arr)
  });
  },[])


  useEffect(()=>{
    const friendsRef = ref(db, 'friends');
    onValue(friendsRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
      arr.push(item.val().whoSendId + item.val().whoReceiveId)
     })
     setFriends(arr)
  });
  },[])
  
  useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
      arr.push(item.val().whoBlockById + item.val().whoBlockedId)
     })
     setBlock(arr)
  });
  },[])

  return (
    <div>
      <div className='flex justify-between items-center '>
          <h4 className='font-inter font-semibold text-primary text-2xl'>People</h4>
          <BsThreeDotsVertical />
        </div>
        <input onChange={handleSearch} type="text" className='px-3 py-2 w-full border border-solid border-strok rounded-lg mt-4 mb-5  ' placeholder='Search'/>
        {evalue.length == 0 ?
        
        userList.map(item=>(
        <div className='flex gap-x-2 items-center mb-4'>
            <img src={item.profile_picture} className='w-12 h-12 rounded-full'/>
            <h5 className='font-inter font-semibold text-dark text-lg'>{item.username}</h5>
          {frReq.includes(userInfo.uid+item.userId) || frReq.includes(item.userId+userInfo.uid) ?
            <div>
            <Button name="pending" className="bg-orange-200 " type="disabled"/>
            </div>
          :
          friends.includes(userInfo.uid+item.userId) || friends.includes(item.userId+userInfo.uid) ?
            <div>
            <Button name="Friends" className="bg-green-800 " type="disabled"/>
            </div>

          :
          block.includes(userInfo.uid + item.userId) || block.includes(item.userId+userInfo.uid) ?
          <div>
          <Button name="Blocked" className="bg-red-400" type="disabled"/>
          </div>
          :

            <div onClick={()=>handleAddFriendRequest(item)}>
            <Button name="add"/>
            </div>
          }
        </div>
        ))
      :
      searchList.length > 0 ? 

      searchList.map(item=>(
        <div className='flex gap-x-2 items-center mb-4'>
            <img src={item.profile_picture} className='w-12 h-12 rounded-full'/>
            <h5 className='font-inter font-semibold text-dark text-lg'>{item.username}</h5>
            {frReq.includes(userInfo.uid+item.userId) || frReq.includes(item.userId+userInfo.uid) ?
            <div>
            <Button name="pending" className="bg-orange-200" type="disabled"/>
            </div>
          :
          friends.includes(userInfo.uid+item.userId) || friends.includes(item.userId+userInfo.uid) ?
            <div>
            <Button name="Friends" className="bg-green-800" type="disabled"/>
            </div>

          :
          block.includes(userInfo.uid + item.userId) || block.includes(item.userId+userInfo.uid) ?
          <div>
          <Button name="Blocked" className="bg-red-400" type="disabled"/>
          </div>
          :

            <div onClick={()=>handleAddFriendRequest(item)}>
            <Button name="add"/>
            </div>
          }
        </div>
        ))
      :
      <h1>not found</h1>

      }

         
    </div>
  )
}

export default People