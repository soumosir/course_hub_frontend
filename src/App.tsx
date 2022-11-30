import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './components/navbar/navbar'
import { Routes, Route } from 'react-router-dom'
import UserSignUp from './components/userSignUp/userSignUp'
import UserSignIn from './components/userSignIn/userSignIn'
import Home from './components/home/home'
import Courses from './components/courses/courses'
import Wishlist from './components/wishlist/wishlist'
import CourseDetail from './components/courseDetail/courseDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <NavBar></NavBar>
    <Routes>
        <Route path='/home' element = { <Home />} />
        <Route path='/courses' element={ <Courses/> }/>
        <Route path='/wishlist' element={ <Wishlist/> }/>
        <Route path='/course/:id' element={<CourseDetail/> }/>
        {/* <Route path='/' element={ </> }/> */}
        {/* <Route path='/signup' element={ <UserSignUp/> }/> */}

    </Routes>
    </div>

  )
}

export default App
