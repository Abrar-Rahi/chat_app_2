import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import pp from "../assets/pp.png"
import Button from './Button';
import { RxCross2 } from "react-icons/rx";
import { getDatabase, ref, onValue,set,push } from "firebase/database";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Group = () => {
  const db = getDatabase();
  let userInfo = useSelector(state=>state.userInfo.value)
  let [groupPopup, setGroupPopup] = useState(false)
  let [groupCreatePopup, setGroupCreatePopup] = useState(false)
  let [newGroup, setNewGroup] = useState("")
  let [groupList, setGroupList] = useState([])

  let handleNewGroupCreate =()=>{
    set(push(ref(db, 'group')), {
      groupName : newGroup,
      admin : userInfo.displayName,
      adminId : userInfo.uid,
      groupPic : "https://firebasestorage.googleapis.com/v0/b/chat-app-2-c42f2.appspot.com/o/TRT%20(283)%20(1).png?alt=media&token=91d8a165-5566-4a43-a813-83623dbcaf23"
    }).then(()=>{
      toast("create Group")
      setGroupCreatePopup(false)
    })
  }

  useEffect(()=>{
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {
      let arr=[]
     snapshot.forEach(item=>{
        arr.push({...item.val(), groupId: item.key})
     })
     setGroupList(arr)
  });
  },[])

  return (
    <div>
      <div className='flex justify-between items-center '>
        <h4 className='font-inter font-semibold text-primary text-2xl'>Group</h4>
        {groupCreatePopup ?
          <div className='ml-40' onClick={() => setGroupCreatePopup(false)}>
            <Button name="Back" />
          </div>
          :

          groupPopup &&
          <div className='ml-40' onClick={() => setGroupCreatePopup(true)}>
            <Button name="create group ?" />
          </div>

        }

        {groupPopup ?
          <RxCross2 onClick={() => setGroupPopup(false)} className='text-xl text-primary cursor-pointer' />
          :

          <div>
            <BsThreeDotsVertical onClick={() => setGroupPopup(true)} className='cursor-pointer' />
          </div>
        }
      </div>
      {groupCreatePopup ?
        <div className='mt-10'>
          <input onChange={(e)=>setNewGroup(e.target.value)} type="text" className='px-3 py-2 w-full border border-solid border-strok rounded-lg mt-4 mb-5' placeholder='Group Name' />
          <div onClick={handleNewGroupCreate} className='flex justify-center'>
            <Button name="create your group" className="bg-green-800"/>
          </div>
        </div>
        :
        <>
          <input type="text" className='px-3 py-2 w-full border border-solid border-strok rounded-lg mt-4 mb-5  ' placeholder='Search' />
          {groupList.map(item=>(
          <>
          <div className='flex gap-x-2 items-center mb-4'>
            <img src={item.groupPic} className='w-12 h-12 rounded-full' />
            <div>
            <h5 className='font-inter font-semibold text-dark text-lg'>{item.groupName}</h5>
            <p className='font-inter font-normal text-primary text-sm'>{`admin:${item.admin}`}</p>
            </div>
            {userInfo.uid==item.adminId?
            <div>
            <Button name="my group" className="last:ml-10 bg-green-800 opacity-25" type="disabled"/>
           </div>
          :
          
            <div>
             <Button name="join group" className="last:ml-10 bg-green-800"/>
            </div>
          }
          </div>
            <hr />
          </>
          ))}
        </>
      }

    </div>
  )
}

export default Group