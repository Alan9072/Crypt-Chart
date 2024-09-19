import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import './Navbar.css'
import { CgMenuGridO } from "react-icons/cg";

function Navbar({curr,setCurr,query,setQuery}) {
    const [val,setVal] = useState("");
    function handleChange(e){
        setVal(e.target.value)
        setQuery(e.target.value)
    }
    function handleBtnSubmit(e){
        e.preventDefault();
    }
    
  return (
    <div className='navbar'>
        <h2>Crypt-Chart</h2>
        <form action="" onSubmit={handleBtnSubmit}>
            <input type="text" value={query} placeholder='Search crypto' onChange={handleChange}/>
            <BsSearch onClick={handleBtnSubmit} style={{backgroundColor:"white",height:"0.7cm",width:"0.7cm",padding:"3px",borderRadius:"5px"}}/>
        </form>
        <select value = {curr} onChange={(e)=>setCurr(e.target.value)}>
            <option value="usd" >USD</option>
            <option value="eur" >EUR</option>
            <option value="inr" >INR</option>
        </select>
        <CgMenuGridO className='menu'/>
    </div>
  )
}

export default Navbar