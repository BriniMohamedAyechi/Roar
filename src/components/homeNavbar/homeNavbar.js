import React, { useState } from 'react'
import {FaBars, FaBell, FaTimes, FaUserPlus } from 'react-icons/fa'
import Logo from '../homeNavbar/logoroar.png'
import profilePic from '../homeNavbar/profilepic.jpeg'
import '../homeNavbar/homeNavbar.css'
import  InputWithIcon from '../seachbarComponent/searchcomopenent'
import '../seachbarComponent/searchBar.css'
import { Logout, MessageSharp } from '@mui/icons-material'
import '../closeFriend/closeFriend.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const HomeNavBar = () => {
    const [click, setClick] = useState(false)

    const logOut = () => {
        window.localStorage.clear();
        window.location.href='./';


    }

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    return (
        <div className={scrolled ? "navbar scrolled" : "navbar-home"}>
            <div className='logo'>
                <img src={Logo} alt='logo' />
            </div>
            <div className='search-bar-form'>
            <InputWithIcon/>
            </div>

            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'><span><FaUserPlus size={25} /></span></li>
                <li className='nav-item'><Link to="/Chats"><MessageSharp size={50}/></Link></li>
                <li className='nav-item'><span><FaBell size={25}/></span></li>
                <li className='nav-item' onClick={logOut}><span><Logout size={25}/></span></li>

            </ul>


        </div>
    )
}

export default HomeNavBar