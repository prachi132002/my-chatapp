import React, { useState } from "react";
import "./join.css";
import logo from "./logo.jpeg";
import { Link } from "react-router-dom";

let user;
const Join = () => {
  const [name, setName] = useState("");
 

  const sendUser = () => {
    user = document.getElementById("joininput").value;
    document.getElementById("joininput").value = "";
  };
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo"></img>
        <h1> LOLounge</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="joininput"
        />
 
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          to="/chat">
          <button onClick={sendUser} className="joinbtn">
            Guess Who?
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user }; 