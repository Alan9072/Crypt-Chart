import React from 'react'
import { BsSearch } from "react-icons/bs";
import './Navbar.css'
import { CgMenuGridO } from "react-icons/cg";

function Navbar() {
  return (
    <div className='navbar'>
        <h2>Crypt-Chart</h2>
        <form action="">
            <input type="text" placeholder='Search crypto'/>
            <BsSearch style={{backgroundColor:"white",height:"0.7cm",width:"0.7cm",padding:"3px",borderRadius:"5px"}}/>
        </form>
        <select>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
        </select>
        <CgMenuGridO className='menu'/>
    </div>
  )
}

export default Navbar