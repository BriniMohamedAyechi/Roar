import React from 'react'
import { FaFacebook, FaTwitter, FaGithub, FaMicrosoft, FaGoogle, FaPhone} from 'react-icons/fa'
import './Hero.css'
import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Hero extends Component{

    constructor (props){
        super(props)
        this.state={
          fname:"",
          email:"",
          password:"",
          image:"",
    
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.convertToBase64=this.convertToBase64.bind(this);
      }
      handleSubmit(e){
        e.preventDefault();
        const {fname,email,password}=this.state;
    
        fetch("http://localhost:5000/register",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
    
          },
          body:JSON.stringify({
            fname,
            email,
            password,
          }),
    
        }).then((res)=>res.json()).then((data)=>{
          console.log(data,"userRegistred")
        })
      
      
      }
        convertToBase64(e){
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
          console.log(reader.result);
          this.setState({image:reader.result});
        };
        reader.onerror=error=>{
          console.log("Error",error);
        }

      }

    render(){
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
                            <p className='txt'>Sign Up</p>
                                <form className='' action=''onSubmit={this.handleSubmit} >
                                    <input type='text' placeholder='Name' onChange={(e)=>this.setState({fname:e.target.value})} />
                                    <input type='text' placeholder='Email'onChange={(e)=>this.setState({email:e.target.value})} />
                                    <input type='password' placeholder='Password' onChange={(e)=>this.setState({password:e.target.value})} />
                                    <center><div className='imageInput'> Upload your profile picture <input accept='image/*' type="file" onChange={this.convertToBase64}></input></div></center>
                                    <button className='createButton'>Create Your Account</button>
                                    <div className='haveAccount'><text className='haveAccount'>Already have an account ?<span className='link'> <Link to='/' className='SignIn'>Sign In</Link></span></text>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}}

