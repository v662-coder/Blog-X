
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link, } from "react-router-dom";
import { useState } from "react";
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Login from './Pages/Login';
import { signOut } from 'firebase/auth';
import { auth} from "./firebase-config";

function App() {
  const [isAuth,setIsAuth]=useState(false);
  const signUserOut=()=>{
    signOut(auth).then(()=> {
      localStorage.clear();
      setIsAuth(false);
      console.log("logout")
    window.location.pathname="/login";
    });
  }
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to ="/">Home</Link>
          <Link to ="/createpost">Create Post</Link>
          {!isAuth ? <Link to ="/login">Login</Link> : <button onClick={signUserOut}>logout</button>}
          </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/createpost" element={<CreatePost  isAuth={isAuth}/ >}/>
          <Route path="/login" element={<Login  setIsAuth={setIsAuth}/>}/>
        </Routes>
      </Router>
       
     
    </div>
  );
}

export default App;