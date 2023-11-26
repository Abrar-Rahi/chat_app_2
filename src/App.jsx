
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>

      </Route>

    )
  );
  
  return (
    <>
    
    <RouterProvider router={router} />
    
       
    </>
  )
}

export default App
