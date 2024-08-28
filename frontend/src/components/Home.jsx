import React, { useState } from 'react'
import './style.css';
import Dashboard from './Dashboard';
import { NavLink,Outlet } from 'react-router-dom';
import Footer from './Footer';
function Home() {
  const [selected,isSelected]=useState({home:true,search:false,about:false});

  return (<>
  <div className='color-nav'>
    <div className='nav-container'>
        <div className='logo-item'><b>Welcome, {localStorage.getItem('username')}.</b></div>
        <div className='item-list'>
            <ul id='navbar'>
            
            <NavLink className={selected && selected.home?'active-link-hyper':''}  to="dashboard" onClick={()=>isSelected({home:true,search:false,about:false})}>Home</NavLink>
            <NavLink className={selected && selected.search?'active-link-hyper':''} to="search" onClick={()=>isSelected({home:false,search:true,about:false})}>Search</NavLink> 
            <NavLink className={selected && selected.about?'active-link-hyper':''} to="about" onClick={()=>isSelected({home:false,search:false,about:true})}>About</NavLink>
            </ul>
        </div>
    </div>
    </div>
    <Outlet/>
    <Footer/>
  </>
   
  )
}

export default Home