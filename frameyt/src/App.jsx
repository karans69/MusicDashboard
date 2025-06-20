import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './assets/component/Home'
import LoginPage from './assets/component/LoginPage'
import Supports from './assets/component/Supports'
import AdminDashboard from './assets/component/AdminDashboard'
import AdminSupportPanel from './assets/component/AdminSupportPanel';
import CreateUser from './assets/component/CreateUser';
import TrackList from './assets/component/TrackList';
import TrackUploadform from "./assets/component/TrackUploadForm"


const App = () => {
  

const [name, setName] = useState("")
  
const submiter= (e)=>{
  console.log(name)
  e.preventDefault()
  setName('')
}

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='trackUp' element={<TrackUploadform/>} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/support" element={<Supports />} />
        <Route path="/AdminSupport" element ={<AdminSupportPanel/>}/>
        <Route path="/Createuser" element ={<CreateUser/>}/>
        <Route path="/Login" element = {<LoginPage/>}/>
        <Route path="/TrackList" element={<TrackList/>}/>
        {/* Add other routes here as needed */}
      </Routes>
    </Router>
  )
}

export default App
