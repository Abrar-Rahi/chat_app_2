import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import pp from "../assets/pp.png"
import { getDatabase, ref, onValue,set,push,remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Button from './Button';

const Friends = () => {
  const db = getDatabase();
  let userInfo = useSelector(state=>state.userInfo.value)
  let [friendList,setFriendList]=useState([])

  useEffect(()=>{
    const friendsRef = ref(db, 'friends');
    onValue(friendsRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
      
      if(userInfo.uid == item.val().whoSendId || userInfo.uid == item.val().whoReceiveId){
        arr.push({...item.val(), friendsId:item.key})
      }
     })
     setFriendList(arr)
  });
  },[])

  let handleUnfriend =(item)=>{
    remove(ref(db, 'friends/' + item.friendsId))
}

  let handleBlock =(item)=>{
    if(userInfo.uid == item.whoSendId){
      set(push(ref(db, 'block')), {
        whoBlockBy : userInfo.displayName,
        whoBlockById : userInfo.uid,
        whoBlockByPic : userInfo.photoURL,
        whoBlocked : item.whoReceive,
        whoBlockedId : item.whoReceiveId,
        whoBlockedPic : item.whoReceivePhoto
      }).then(()=>{
        remove(ref(db, 'friends/' + item.friendsId))
      })
    }else{
      set(push(ref(db, 'block')), {
        whoBlockBy : userInfo.displayName,
        whoBlockById : userInfo.uid,
        whoBlockByPic : userInfo.photoURL,
        whoBlocked : item.whoSend,
        whoBlockedId : item.whoSendId,
        whoBlockedPic : item.whoSendPhoto
      }).then(()=>{
        remove(ref(db, 'friends/' + item.friendsId))
      })
    }
}

  return (
    <div>
       <div className='flex justify-between items-center '>
            <h4 className='font-inter font-semibold text-primary text-2xl'>Friends</h4>
            <BsThreeDotsVertical />
          </div>
          <input type="text" className='px-3 py-2 w-full border border-solid border-strok rounded-lg mt-4 mb-5 ' placeholder='Search'/>
          {friendList.map(item=>(

          <div className='flex gap-x-2 items-center mb-4'>
             {userInfo.uid == item.whoSendId ?
             <>
             <img src={item.whoReceivePhoto} className='w-12 h-12 rounded-full'/>
             <h5 className='font-inter font-semibold text-dark text-lg'>{item.whoReceive}</h5>
             </>
             :
             <>
             <img src={item.whoSendPhoto} className='w-12 h-12 rounded-full'/>
             <h5 className='font-inter font-semibold text-dark text-lg'>{item.whoSend}</h5>
             </>
            }
             <div onClick={()=>handleBlock(item)}>
            <Button name="Block" className="bg-red-500"/>
            </div>
             <div onClick={()=>handleUnfriend(item)}>
            <Button name="UnFriend"/>
            </div>
          </div>
          ))}
          
    </div>
  )
}

export default Friends