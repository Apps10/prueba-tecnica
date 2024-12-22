import './App.css'
import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components"
import { Toaster } from 'react-hot-toast'
import { LoginPage } from './pages/index'
import { useAuthStore } from './redux/hooks/useAuthStore'


function App(){
  const {  authUser } = useAuthStore();
  console.log({authUser});
  return (
    <div>
      <div data-theme='light'>
        <Navbar/>

         <Routes>
           <Route path='/login' element={ !authUser ? <LoginPage/> : <h1>hola mundo</h1> } />
         </Routes>
         <Toaster/>
        </div>
     </div>
  )

}

export default App