// import socketIO from "socket.io-client"
import {BrowserRouter as Router,Route, Routes}from "react-router-dom"
import React from 'react'
import "./App.css"
import Join from "./Component/Join/Join"
import Chat from "./Component/Chat/Chat"
// const ENDPOINT="http://localhost:4500/"
// const socket=socketIO(ENDPOINT,{transports:['websocket']})

function App() {
 
  
  return (
    <div className="app">

  <Router>
  <Routes>
    <Route  path="/" Component={Join}/>
      <Route path="/Chat" Component={Chat}/>
      </Routes>
  </Router>
 
    </div>
  )
}

export default App
  