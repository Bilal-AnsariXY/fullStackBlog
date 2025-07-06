import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Blog from './components/Blog'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Create from './components/Create'
import Cant from './components/Cant'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element= {<Home/>}></Route>
          <Route path='/blog' element= {<Blog/>}></Route>
          <Route path='/login' element= {<Login/>}></Route>
          <Route path='/cant' element= {<Cant/>}></Route>
          <Route path='/create' element= {<Create/>}></Route>
          <Route path='/register' element= {<Register/>}></Route>
          <Route path='/' element= {<Home/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
