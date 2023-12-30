import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetEmail = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let [inputValue,setInputValue]=useState("")

    let handleChange = (e)=>{
        setInputValue(e.target.value)
      }

      let handleReset = ()=>{
        sendPasswordResetEmail(auth, inputValue)
        .then(() => {
          navigate("/")
          toast("An Email send on your mail Eddress. please reset your password")
        })
      }
  return (
    <div className='flex justify-center mt-[200px]'>
        <div className='w-[500px] h-[500px] bg-heroimg bg-cover flex flex-col items-center justify-center '>

        <input name='email' onChange={handleChange}  className={`block w-2/3 mx-auto py-4 pl-3 border border-solid border-strok rounded-lg my-4`} placeholder='Enter your mail' type="text" />

       <div>
        <button className='p-3 font-inter font-semibold text-white text-xl bg-red-500 rounded-lg mr-2' onClick={handleReset}>Reset Email</button>

        <Link to={"/"}>
        <button className='p-3 font-inter font-semibold text-white text-xl bg-primary rounded-lg'>Go Back</button>
        </Link>
       </div>
            
        </div>
    </div>
  )
}

export default ResetEmail