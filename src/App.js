import React from 'react'
import Navbar from './components/authNavbar/Navbar';
import Hero from './components/signUp/Hero';
import { Route,Routes } from 'react-router'
import Signin from './components/login/signIn';
import Home from './components/homePage/homePage'
import HomeNavBar from './components/homeNavbar/homeNavbar';
import Sidebar from './sidebar/Sidebar';
import Chat from './components/chat/chat';
import Reset from './components/resetPassword/resetPassword';
import Feed from './components/feed/Feed';
function App() {
  const isloggedIn=window.localStorage.getItem("loggedIn")
  return (
    <> 
       <Routes>
        <Route path="/" element={
          isloggedIn=="true"?
        <>
          <HomeNavBar/>
          <Sidebar/>
          <Feed/>
          <Home/>
        </> :
        <>
          <Navbar/>
          <Signin/>
        </>

      } />
      <Route path="/signUp" element={
        <>
          <Navbar/>
          <Hero/>
        </>
      } />

<Route path="/chats" element={
            isloggedIn=="true"?

        <>
          <Chat/>
        </>
      :
      <>
      <Navbar/>
      <Signin/>
      </>
}/>
<Route path="/reset" element={
  <>
  <Reset/>
  </>
}>

</Route>

        </Routes>
    </>
  );
}

export default App;
