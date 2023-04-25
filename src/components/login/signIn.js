import React from 'react'
import { FaFacebook, FaTwitter, FaGithub, FaGoogle, FaMicrosoft, FaAndroid, FaPhone} from 'react-icons/fa'
import '../signUp/Hero.css'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
const Signin =(props)=>{
    const [email, setEmail] = useState("");
    const [secret, setSecret] = useState();
    const[name,setName] = useState();
    const [password, setPassword] = useState("");
    
     const handleSubmit=(e)=>{
        e.preventDefault(); 
        fetch("http://localhost:5000/login",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
    
          },
          body:JSON.stringify({
            email,
            password,
          }),
    
        }).then((res)=>res.json()).then((data)=>{
          console.log(data,"Done")

          if(data.status=="OK"){
            axios
            .post("http://localhost:5000/chatlogin", { name ,password })
            .then((r) => props.onAuth({ ...r.data, secret:secret })) // NOTE: over-ride secret
            .catch((e) => console.log(JSON.stringify(e.response.data)))
            alert("login Successfull")
            window.localStorage.setItem("token",data.data)
            window.localStorage.setItem("loggedIn",true)

            window.location.href="./"; //send data from window to window

        }})



    }
    function onclick(){
        setName("mourad");
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
                            <p className='txt'>Sign in</p>
                                <form action=''onSubmit={handleSubmit} >
                                    <input type='text' placeholder='Email'onChange={(e)=>setEmail(e.target.value)} />
                                    <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
                                    <button className='createButton' onClick={onclick}>Login</button>
                                    <div className='haveAccount'><text className='haveAccount'>No account ?<span> <Link to= "/signUp" className='SignUp'> Sign Up</Link></span></text></div>
                                    <div className='haveAccount'><text className='haveAccount'> Forgot password?<span> <Link to= "/reset" className='SignUp'>  Click Here !</Link></span></text></div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}
export default Signin
