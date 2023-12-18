import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { usersLoginInfo } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let userInfo = useSelector(state=>state.userInfo.value)
  console.log(userInfo);

  let handleLogOut = ()=>{
    signOut(auth).then(() => {
     dispatch(usersLoginInfo(null))
     localStorage.removeItem("users")
      navigate("/")
      toast.success("Logout successfull")
    })
  }

  useEffect(()=>{
    if(userInfo == null){
      navigate("/")
    }
  },[])
  return (
    <div>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Home