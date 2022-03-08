import React from 'react'
import { BrowserRouter as Router, Switch,Route, Link
} from "react-router-dom";

function Callback() {
    const code = new URLSearchParams(window.location.search).get("code")
    //store code  local storage
    localStorage.setItem("code", code)
    
  return (
    <div>
    <Link to="/home">Home</Link>
    </div>

  )
}

export default Callback