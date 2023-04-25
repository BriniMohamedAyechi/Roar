import axios from "axios";
import '../chat/authPage.css'


const AuthPage = (props) => { 
  
  const onSubmit = (e) => {
  e.preventDefault();
  const { value } = e.target[0];
  axios
    .post("http://localhost:5000/authenticate", { username: value })
    .then((r) => props.onAuth({ ...r.data, secret: value }))
    .catch((e) => console.log("Auth Error", e));
};
  
  return (
    <div className="login-page">
      <div className="card">
        <form onSubmit={onSubmit}>
          <div className="title">Welcome to chat</div>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
          />
          <button type="submit">Start chatting</button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;