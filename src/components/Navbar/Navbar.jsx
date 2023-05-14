/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import $ from'jquery'

import { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { token,logout } from '../../Resux/RegisterSlice'
import logo from '../Media/logo.548dc5719c2345c22eef.png'
export default function Navbar() {
  function closeBtn (){
       
    if ($(window).innerWidth()<991){
      $(".navbar-toggler").addClass("collapsed")
      $(".navbar-toggler").attr("aria-expanded",true)
      $("#navbarSupportedContent").removeClass("show")
    }
}


 let Navigate =useNavigate()
let {User}=useSelector((state)=>state.Register)
let Dispatch=useDispatch()
   let{key}= useSelector((state)=>state.Register)
   function LogOut(){
    Dispatch(logout())
    Navigate("/login")
  }
   useEffect(() => {
   Dispatch(token())
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
  return <>

  <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-dark fixed-top ">
  <div className="container">
   <span className="navbar-brand  cursor-pointer" > <img height={50} src={logo} /> Game Over</span> 
    <button className="navbar-toggler  " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon " />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {key?<>
        <ul className="navbar-nav ms-5  mb-2 mb-lg-0  ">
        <li className="nav-item">
         <Link onClick={closeBtn} className="nav-link active " aria-current="page" to={"/"}>Home</Link> 
        </li>
        <li className="nav-item">
         <Link onClick={closeBtn} className="nav-link" to={"/All"}>All</Link> 
        </li>
        <li className="nav-item dropdown">
         <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         Platforms
          </Link> 
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link onClick={closeBtn} className="dropdown-item"to={`Platforms/pc`} >PC   </Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item"to={`Platforms/browser`} >Browser</Link></li>
           
          </ul>
        </li>
        <li className="nav-item dropdown">
         <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         sort-by 
          </Link> 
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" onClick={closeBtn} to={`SortBy/release-date`} >Release-date   </Link></li>
            <li><Link className="dropdown-item" onClick={closeBtn} to={`SortBy/popularity`}>Popularity</Link></li>
            <li><Link className="dropdown-item" onClick={closeBtn} to={`SortBy/alphabetical`}>Alphabetical</Link></li>
            <li><Link className="dropdown-item" onClick={closeBtn} to={`SortBy/relevance`}>Relevance</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
         <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         Categories 
          </Link> 
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/shooter`} >Shooter</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/racing`} >Racing</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/sports`} >Sports</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/social`} >Social</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/open-World`} >Open World</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/zombie`} >Zombie</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/fantasy`} >Fantasy</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/action-rpg`} >Action Rpg</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/action`} >Action</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/flight`} >Flight</Link></li>
            <li><Link onClick={closeBtn} className="dropdown-item" to={`Categories/battle-royale`} >Battle Royale</Link></li>
            
         
          </ul>
        </li>
        
      </ul>
      </>:""}
      <ul className='navbar-nav ms-auto mb-2 mb-lg-0 ' >
        {key?<>
        <li><span className="nav-link  mx-2 " >WellCome :<span className=' nav-button'> {User.name}</span> </span></li>
        <li><span className="nav-link btn nav-button mx-2 cursor-pointer" onClick={LogOut} >LogOut</span></li>
        </>
        :<> 
        <li><Link className="nav-link" to={"login"}>LogIn</Link></li>
        <li><Link className="nav-link btn nav-button mx-2" to={"register"}>Join Free</Link></li>
        </>
        
        }
      </ul>
     
      
      
    </div>
  </div>
  
</nav>



  </>
}
