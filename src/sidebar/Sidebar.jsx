import React, { Component } from 'react'
import './sidebar.css'
import {RssFeed,Chat, PlayCircleFilledOutlined,Group,Bookmark,
        HelpOutline,WorkOutline,Event,School} from '@mui/icons-material'
import {Users} from './dummyData'
import CloseFriend from '../components/closeFriend/CloseFriend'

export default class  Sidebar extends Component{

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

       return(<div className='sidebar'>
            <div className="sidebarWrapper">
                <div className='profileName'><h1 className='primary-color'>{str}</h1></div>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarIcon'/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className='sidebarIcon'/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className='sidebarIcon'/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className='sidebarIcon'/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className='sidebarIcon'/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className='sidebarIcon'/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className='sidebarIcon'/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className='sidebarIcon'/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className='sidebarIcon'/>
                        <span className="sidebarListItemText">Couseses</span>
                    </li>
                </ul>
                <hr className='sidebarHr'/>
                <ul className="sidebarFriendList">
                    {Users.map(u=> (
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )}
}

