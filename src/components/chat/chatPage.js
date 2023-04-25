import { height } from '@mui/system';
import React from 'react'
import{PrettyChatWindow} from 'react-chat-engine-pretty'
function ChatPage(props) {
  return (
    <div style={{ 
      height: "100vh",
      width: "100vw",
      backgroundColor: 'white'}}>
      <PrettyChatWindow
        projectId='dcf2cc39-f382-4cc1-9e5d-737184800eca'
        username={props.user.username} // 
        secret={props.user.secret} // 
        style={{ 
            height: "100%",
    }}/>
    </div>
  )
}

export default ChatPage