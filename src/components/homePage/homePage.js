import React from 'react'
import '../homePage/Hero.css'
import { Component } from 'react'

export default class Home extends Component{

    constructor (props){
        super(props)
        this.state={
            userData:"",
        };}
    componentDidMount(){ // rerendring while getting new data 

        
            fetch("http://localhost:5000/userData",{
              method:"POST",
              crossDomain:true,
              headers:{
                "Content-type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
              },
              body:JSON.stringify({
                token: window.localStorage.getItem("token") //get token from windows local storage
              }),
        
            }).then((res)=>res.json()).then((data)=>{
              console.log(data,"Done")
              this.setState({userData:data.data});
            })
    }
    render(){
        const str = this.state.userData.fname

        
    return (
        <div className='mainpage'>
            <div className='container'>
                <div className='content'>
                    <div className='homeCol1'>
                    </div>

                </div>
            </div>
        
        </div>
    )
}}

