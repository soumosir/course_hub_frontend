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
<<<<<<< Updated upstream
import Content from "./components/courseDetail/content";
=======
import Exam from './components/exam/exam'
>>>>>>> Stashed changes

function App() {
  // const [count, setCount] = useState(0)
  //   window.addEventListener("beforeunload", function(e){
  //       localStorage.clear();
  //   }, false);
  return (
    <div className="App">
        <NavBar></NavBar>
    <Routes>
        <Route path='/home' element = { <Home />} />
        <Route path='/courses' element={ <Courses/> }/>
        <Route path='/wishlist' element={ <Wishlist/> }/>
        <Route path='/course/:id' element={<CourseDetail/> }/>
        <Route path='/signin' element={<UserSignIn/> }/>
<<<<<<< Updated upstream
        <Route path='/course/:id/content' element={<Content/>}/>
=======
        <Route path='/exam/:id' element={<Exam/> }/>
>>>>>>> Stashed changes
        {/* <Route path='/' element={ </> }/> */}
         <Route path='/signup' element={ <UserSignUp/> }/>

    </Routes>
    </div>

  )
}

export default App
