import React, { useState } from 'react'
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa'
import Logo from "./logoroar.png"
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)
    const style = { color: "white", fontSize: "1.5em" }

    return (
        <div className='navbar'>
            <div className='logo'>
                <img src={Logo} alt='logo' />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'><Link to='/Home'>Home</Link></li>
                <li className='nav-item'><Link to='/login'>Login</Link></li>
                <li className='nav-item'><Link to="/signUp">SignUp</Link></li>
            </ul>
            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={30} style={{ color: '#f8f8f8' }} />) : (<FaBars size={30} style={{ color: '#f8f8f8' }} />)}

            </div>
        </div>
    )
}

export default Navbar