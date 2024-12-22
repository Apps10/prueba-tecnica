import './App.css'
import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components"
import { Toaster } from 'react-hot-toast'
import { LoginPage } from './pages/index'


function App(){

  return (
    <div>
      <div data-theme='light'>
        <Navbar/>

         <Routes>
           <Route path='/login' element={ <LoginPage/> } />
         </Routes>
         <Toaster/>
        </div>
     </div>
  )

}

export default App