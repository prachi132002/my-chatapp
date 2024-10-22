import React from 'react'
import "./Message.css";
const Msg=({user,message,classs})=> {
  if(user){
    return (
      <div className= {`msgbox ${classs}`}>
        {`${user}:${message}`}
      </div>
    )
  }
  else{
    return (
      <div className={`msgbox ${classs}`}>
        {`You: ${message}`}
      </div>
    )
  }
     
  }
  
export default Msg
