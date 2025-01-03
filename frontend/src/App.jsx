import './App.css'
import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components"
import { Toaster } from 'react-hot-toast'
import { LoginPage } from './pages/index'
import { useAuthStore } from './redux/hooks/useAuthStore'
import { StorePage } from './pages/StorePage'
import { SignInPage } from './pages/SignInPage'
import { checkAuth } from './redux/slice/userSlice'
import { useEffect } from 'react'


function App(){
  const {  authUser, checkAuthAction } = useAuthStore();

  
  useEffect(()=>{
    checkAuthAction()
  },[])


  return (
    <div>
      <div data-theme='light'>
        <Navbar/>
         <Routes>
          <Route path='/' element={ <StorePage/>  } />
          <Route path='/login' element={ !authUser ? <LoginPage/> : <Navigate to="/"/> } />
          <Route path='/signin' element={ !authUser ? <SignInPage/> : <Navigate to="/"/> } />
         </Routes>
         <Toaster/>
        </div>
     </div>
  )

}

export default App