import React, { useState,createRef } from 'react'
import { MdHome } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
import { MdGroup } from "react-icons/md";
import { FcBusinessman } from "react-icons/fc";
import { PiUserList } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";
import { getAuth, signOut ,updateProfile} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { usersLoginInfo } from '../slices/userSlice';
import { GiThink } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dref, set } from "firebase/database";
import { FidgetSpinner } from 'react-loader-spinner'
;

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";


const Sidebar = () => {
  const db = getDatabase();
  const storage = getStorage();
  const auth = getAuth();
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let userInfo = useSelector(state=>state.userInfo.value)

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  
  

  let [logoutPopup,setLogoutPopup] = useState(false)
  let [updatePopup,setUpdatePopup] = useState(false)
  let [loader,setLoader] = useState(false)

  let handleLogOut = ()=>{
    signOut(auth).then(() => {
     dispatch(usersLoginInfo(null))
     localStorage.removeItem("users")
      navigate("/")
      toast.success("Logout successfull")
    })
  }

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    setLoader(true)
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, userInfo.uid);
      const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
      uploadString(storageRef, cropperRef.current?.cropper.getCroppedCanvas().toDataURL(), 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(()=>{
            set(dref(db, 'users/' + userInfo.uid), {
              username: userInfo.displayName,
              email: userInfo.email,
              profile_picture : downloadURL
            }).then(()=>{
              dispatch(usersLoginInfo({...userInfo, photoURL: downloadURL}))
              localStorage.setItem("users", JSON.stringify({...userInfo,photoURL: downloadURL }))
              setImage("")
              setUpdatePopup(false)
              setLoader(false)
            })
          })
        });
});
      
    }
  };

  return (
    <div>
      <h2 className='font-inter font-bold text-primary text-3xl'>Chatt.</h2>
      <div className='flex items-center gap-x-3 mt-6 cursor-pointer' onClick={()=>setUpdatePopup(true)}>
        <img className='w-16 h-16 rounded-full' src={userInfo.photoURL} alt="pp" />
        <h1 className='font-inter font-semibold text-2xl text-promary'>{userInfo.displayName}</h1>
      </div>
      {updatePopup && 
        <div className='w-[600px] py-10  bg-stone-200 shadow-2xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
          <RxCross2 onClick={()=>setUpdatePopup(false)} className='absolute top-0 right-0 text-3xl text-primary cursor-pointer'/>

        {image ?
          
          <div className='w-32 h-32 rounded-full overflow-hidden mx-auto mt-3 text-center'>
            <div 
              className="img-preview w-32 h-32 rounded-full"
              
            />
          </div>
        :
        <img className='w-32 h-32 rounded-full mx-auto mt-3 text-center' src={userInfo.photoURL} alt="pp" />
        }
          <div className='text-center'>
          <input onChange={onChange} type="file" className='my-5 py-2.5 px-5 bg-primary text-white rounded-lg'/>
          </div>

          {image &&

          <>
          <div className='bg-white'>
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
          </div>
        <div className='flex gap-x-2 ml-[200px]'>
        {loader ?
        <button className=' my-6 px-2'> 

          <FidgetSpinner
            visible={true}
            height="60"
            width="60"
            ariaLabel="fidget-spinner-loading"
            wrapperStyle={{}}
            wrapperClass="fidget-spinner-wrapper"
            />
        </button>
      :
      
        <button className='py-3 px-2 font-inter font-semibold text-white text-xl bg-primary rounded-lg my-6 hover:bg-redient2 hover:text-primary duration-300 ' onClick={getCropData}>Upload</button>
      }

        <button className='py-3 px-2 font-inter font-semibold text-white text-xl bg-primary rounded-lg my-6 hover:bg-redient2 hover:text-primary duration-300 ' onClick={()=>setImage("")}>Cancle</button>
        </div>
          </>

        
          }
        </div>
      }

      <div className='flex flex-col gap-y-10 font-inter font-normal text-blace text-lg mt-8'>

          <Link className={`flex gap-x-2 items-center ml-2 py-3 px-4 ${window.location.pathname == "/user/home" && " bg-primary rounded-xl text-white text-semibold"}`} to={"/user/home"}>
          <MdHome className='text-2xl'/>
          <p>Home</p>
          </Link>
        
          <Link className={`flex gap-x-2 items-center ml-2 py-3 px-4 ${window.location.pathname == "/user/chat" && " bg-primary rounded-xl text-white text-semibold"}`} to={"/user/chat"}>
          <IoChatboxOutline className='text-2xl'/>
          <p>Chat</p>
          </Link>
        
          <Link className={`flex gap-x-2 items-center ml-2 py-3 px-4 ${window.location.pathname == "/user/group" && " bg-primary rounded-xl text-white text-semibold"}`} to={"/user/group"}>
          <MdGroup className='text-2xl'/>
          <p>Group</p>
          </Link>
        
          <Link className={`flex gap-x-2 items-center ml-2 py-3 px-4 ${window.location.pathname == "/user/friends" && " bg-primary rounded-xl text-white text-semibold"}`} to={"/user/friends"}>
          <FcBusinessman className='text-2xl'/>
          <p>Friends</p>
          </Link>
        
          <Link className={`flex gap-x-2 items-center ml-2 py-3 px-4 ${window.location.pathname == "/user/people" && " bg-primary rounded-xl text-white text-semibold"}`} to={"/user/people"}>
          <PiUserList className='text-2xl'/>
          <p>People</p>
          </Link>

          <Link className={`flex gap-x-2 items-center ml-2 py-3 px-4 ${window.location.pathname == "/user/setting" && " bg-primary rounded-xl text-white text-semibold"}`} to={"/user/setting"}>
          <IoSettingsOutline className='text-2xl'/>
          <p>setting</p>
          </Link>

          {logoutPopup ?
          <>
          <div className='ml-2 last:mt-[250px]'>
          <div className='flex gap-x-2 items-center ml-3'>
            <p className='font-inter font-bold text-red-500 text-2xl'>sure?</p>
            <GiThink className='text-2xl text-red-900'/>
          </div>
          
          <div className='flex gap-x-4 items-center ml-4'>
            <button className='text-green-500 font-bold' onClick={handleLogOut}>yes</button>
            <button className='text-red-500 font-bold' onClick={()=>setLogoutPopup(false)}>no</button>
          </div>
          </div>
          </>
        :
        
          <div onClick={()=>setLogoutPopup(true)} className='flex gap-x-2 items-center justify-self-end cursor-pointer last:mt-[250px] mb-10'>
            <HiOutlineLogout className='text-2xl'/>
            <p>LogOut</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Sidebar