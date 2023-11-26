import React from 'react'
import mainimg from "../assets/mainimg.png"
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <div className='flex'>
            <div className='w-5/12 flex items-center justify-center'>
                <div className='w-8/12 ml-10'>
                     <h2 className='font-inter font-bold text-primary text-3xl'>Welcome To Chatt.</h2>
                     <h4 className='font-inter font-bold text-dark text-2xl my-6'>Log In</h4>
                     <label className='font-inter font-semibold text-dark text-base' htmlFor="">Email</label>
                     <input className='block w-full py-4 pl-3 border border-solid border-strok rounded-lg my-4' placeholder='Enter your mail' type="text" />

                     <label className='font-inter font-semibold text-dark text-base' htmlFor="">Password</label>
                     <input className='block w-full py-4 pl-3 border border-solid border-strok rounded-lg my-4' placeholder='Password' type="text" />

                     <div className='flex item-center justify-between'>
                        <div className='flex items-center'>
                            <input type="checkbox" name="" id=""  className='mr-4 w-6 h-6'/>
                            <label className='font-inter font-normal text-dark80 text-base' htmlFor="">Remember Me</label>
                        </div>
                        <p className='font-inter font-normal text-primary text-base'>Forgot Password?</p>
                     </div>
                     <button className='py-3 font-inter font-semibold text-white text-xl w-full bg-primary rounded-lg my-6 hover:bg-redient2 hover:text-primary duration-300'>Log in</button>
                     <div className='flex gap-x-2'>
                        <p className='font-inter font-normal text-dark60 text-base'>Dont’t have an account?</p>
                        <Link to={"/signup"}>
                           <button className='font-inter font-semibold text-primary text-base'>Sign In</button>
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

export default Login