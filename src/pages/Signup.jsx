import React, { useState } from 'react'
import mainimg from "../assets/mainimg.png"
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { Vortex } from  'react-loader-spinner'
import { toast } from 'react-toastify';


const Signup = () => {
    const auth = getAuth();
    let navigate = useNavigate()

    let [loader,setLoader]=useState(false)

    let [nameError,setNameError]=useState()
    let [emailError,setEmailError]=useState()
    let [passError,setPassError]=useState()

    let [inputValue,setInputValue]=useState({
            fullname : "",
            email : "",
            password : ""
    })

    let handleChange = (e)=>{
       
        setInputValue({
            ...inputValue,
            [e.target.name] : e.target.value
            
        })
        
    }
    let handleSignup = ()=>{
        if(inputValue.fullname==""){
            setNameError("What's your Name?")
        }else{
            setNameError("")
        }
        if(inputValue.email==""){
            setEmailError("What's your Email?")
        }else{
            var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
            if(!pattern.test(inputValue.email)){

                setEmailError("Email not valid")
            }else{
                setEmailError("")
            }
            
        }
        if(inputValue.password==""){
            setPassError("What's your password?")
        }else{
            let character = /(?=.{6,})/
            if(!character.test(inputValue.password)){

                setPassError("contain at least 6 digit")
            }else{
                setPassError("")

            }
        }
        setLoader(true)
        createUserWithEmailAndPassword(auth, inputValue.email, inputValue.password )
            .then((userCredential) => {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    
                    navigate("/")
                    setLoader(false)
                    toast.info("A Varification email send on your mail. please verify it")
                });
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                if(errorCode.includes("already")){
                    setEmailError("Email already in use")
                }
                setLoader(false)
                
            });
    }

  return (
    <div>
        <div className='flex'>
            <div className='w-5/12 flex items-center justify-center'>
                <div className='w-8/12 ml-10 relative'>
                     <h2 className='font-inter font-bold text-primary text-3xl'>Welcome To Chatt.</h2>
                     <h4 className='font-inter font-bold text-dark text-2xl my-6'>Sign Up</h4>

                     <label className=' font-inter font-semibold text-dark text-base' htmlFor="">Full Name</label>
                     <p className='font-inter font-semibold text-red-600 text-base absolute top-[173px] left-[341px] '>
                       {nameError} 
                     </p>
                     {nameError ?
                     <input name='fullname' onChange={handleChange} className='block w-full py-4 pl-3 border border-solid border-red-500 rounded-lg my-4' placeholder='Name here' type="text" />
                     :
                     <input name='fullname' onChange={handleChange} className='block w-full py-4 pl-3 border border-solid border-strok rounded-lg my-4' placeholder='Name here' type="text" />
                    
                    } 

                     <label className='font-inter font-semibold text-dark text-base' htmlFor="">Email</label>
                     <p className='font-inter font-semibold text-red-600 text-base absolute top-[286px] left-[341px] '>
                       {emailError} 
                     </p>
                     {emailError ?
                     
                     <input name='email' onChange={handleChange} className='block w-full py-4 pl-3 border border-solid border-red-500 rounded-lg my-4' placeholder='Enter your mail' type="text" />
                     :
                     <input name='email' onChange={handleChange} className='block w-full py-4 pl-3 border border-solid border-strok rounded-lg my-4' placeholder='Enter your mail' type="text" />
                     
                     }

                     <label className='font-inter font-semibold text-dark text-base' htmlFor="">Password</label>
                     <p className='font-inter font-semibold text-red-600 text-base absolute top-[399px] left-[341px] '>
                       {passError} 
                     </p>
                     {passError ?
                     
                     <input name='password' onChange={handleChange} className='block w-full py-4 pl-3 border border-solid border-red-500 rounded-lg my-4' placeholder='Password' type="password" />
                     :
                     <input name='password' onChange={handleChange} className='block w-full py-4 pl-3 border border-solid border-strok rounded-lg my-4' placeholder='Password' type="password" />
                    
                    } 

                     <div className='flex item-center justify-between'>
                        <div className='flex items-center'>
                            <input type="checkbox" name="" id=""  className='mr-4 w-6 h-6'/>
                            <label className='font-inter font-normal text-dark80 text-base' htmlFor="">Remember Me</label>
                        </div>
                        
                     </div>
                     {loader ? 
                     <button>
                     <Vortex
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                        />
                     </button>
                    :
                    
                     <button onClick={handleSignup} className='py-3 font-inter font-semibold text-white text-xl w-full bg-primary rounded-lg my-6 hover:bg-redient2 hover:text-primary duration-300'>Sign Up</button>
                    }
                     
                     <div className='flex gap-x-2'>
                        <p className='font-inter font-normal text-dark60 text-base'> have an account?</p>
                        <Link to={"/"}>
                           <button className='font-inter font-semibold text-primary text-base'>Sign Up</button>
                        </Link>
                     </div>
                </div>
            </div>
            <div className='w-7/12 relative'>
                <div className='absolute top-0 left-0 w-full h-full object-cover bg-gradient-to-b from-redient to-redient2'></div>
                <img className='w-full object-cover' src={mainimg} alt="img" />
            </div>
        </div>
    </div>
  )
}

export default Signup