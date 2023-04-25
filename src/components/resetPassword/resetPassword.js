import React from 'react'
import { FaFacebook, FaTwitter, FaGithub, FaGoogle, FaMicrosoft, FaAndroid, FaPhone} from 'react-icons/fa'
import '../signUp/Hero.css'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'


const Reset =(props)=>{
    const [email, setEmail] = useState("");
     const handleSubmit=(e)=>{
        e.preventDefault(); 
        fetch("http://localhost:5000/forget-password",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
    
          },
          body:JSON.stringify({
            email,
          }),
    
        }).then((res)=>res.json()).then((data)=>{
          console.log(data,"Done")
        alert(data.status);
        })

    }


    
    return (
        <div className='hero'>
            <div className='container'>
                <div className='content'>
                    <div className='col-1'>
                        <h1>Welcome TO </h1>
                        <h1><center></center><span className='primary-color'>ROAR</span></h1>
                        <p>A social media website that u can use for chatting sharing and interacting with your friends</p>
                    </div>
                    <div className='col-2'>
                        <div className='form-layout'>
                            <div className='form-container'>
                            <p className='txt'>Reset Password</p>
                                <form action=''onSubmit={handleSubmit} >
                                    <input type='text' placeholder='Email'onChange={(e)=>setEmail(e.target.value)} />
                                    <button className='createButton'>Reset Password</button>
                                    <div className='haveAccount'><text className='haveAccount'>Or <span> <Link to= "/" className='SignUp'> Login</Link></span></text></div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}
export default Reset
