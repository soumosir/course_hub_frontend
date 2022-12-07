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
import Content from "./components/courseDetail/content";
import Exam from './components/exam/exam'
import { Alert } from '@mui/material'
import AlertComponent from './components/alert/alert'
import Grades from './components/grades/grades'
import AddCourse from "./components/courses/addcourse";
import HomePage from './components/home/homepage'
import NotFoundPage from './components/notFoundPage/notFoundPage'

export const hostUrl = "https://localhost:8443"

function App() {
  // const [count, setCount] = useState(0)
  //   window.addEventListener("beforeunload", function(e){
  //       localStorage.clear();
  //   }, false);
  return (
    <div className="App">
        <NavBar></NavBar>
        {/* <AlertComponent></AlertComponent> */}
    <Routes>
        {/* <Route path='/' element = { <HomePage />} /> */}
        <Route path='/' element = { <Home />} />
        <Route path='/courses' element={ <Courses/> }/>
        <Route path='/wishlist' element={ <Wishlist/> }/>
        <Route path='/course/:id' element={<CourseDetail/> }/>
        <Route path='/signin' element={<UserSignIn/> }/>
        <Route path='/content/:id' element={<Content/>}/>
        <Route path='/course/:id/content' element={<Content/>}/>
        <Route path='/course/add' element={<AddCourse/>}/>
        <Route path='/exam/:id' element={<Exam/> }/>
        {/* <Route path='/' element={ </> }/> */}
         <Route path='/signup' element={ <UserSignUp/> }/>
         <Route path='/grades/:id' element={<Grades/>}/>
         <Route path="*" element={<NotFoundPage/>} />

    </Routes>
    </div>

  )
}

export default App
