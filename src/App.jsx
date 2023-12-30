
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetEmail from './pages/ResetEmail';
import RootLayOut from './components/RootLayOut';


import ChatPage from './pages/ChatPage';
import GroupPage from './pages/GroupPage';
import FriendsPage from './pages/FriendsPage';
import PeoplePage from './pages/PeoplePage';
import Settingpage from './pages/Settingpage';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/resetmail" element={<ResetEmail />}></Route>

      <Route path="/user" element={<RootLayOut />}>

        <Route path="home" element={<Home />}></Route>
        <Route path="chat" element={<ChatPage />}></Route>
        <Route path="group" element={<GroupPage />}></Route>
        <Route path="friends" element={<FriendsPage />}></Route>
        <Route path="people" element={<PeoplePage />}></Route>
        <Route path="setting" element={<Settingpage />}></Route>
        

      </Route>

      </Route>

    )
  );
  
  return (
    <>
    
    <RouterProvider router={router} />
    
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
       
    </>
  )
}

export default App
