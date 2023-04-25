import { useState } from "react";

import AuthPage from "../chat/AuthPage";
import ChatsPage from "../chat/chatPage";

function Chat() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default Chat;