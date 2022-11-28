import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './components/navbar/navbar'
import { Routes, Route } from 'react-router-dom'
import UserSignUp from './components/userSignUp/userSignUp'
import UserSignIn from './components/userSignIn/userSignIn'
import Home from './components/home/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <NavBar></NavBar>
    <Routes>
        <Route path='/home' element = { <Home />} />
        <Route path='/courses' element={ <UserSignUp/> }/>
        <Route path='/wishlist' element={ <UserSignIn/> }/>
        {/* <Route path='/' element={ </> }/> */}
        {/* <Route path='/signup' element={ <UserSignUp/> }/> */}
      
    </Routes>
    </div>
  )
}

export default App
