import React from 'react'
import {useState} from 'react'
import env from "./settings"
import "./login.css";
import "./App.css";
import axios from 'axios';
import {useHistory} from "react-router-dom"
import {Link} from "react-router-dom"
import {showErrMsg,showSuccessMsg} from "./Notifications/Notification"
import Forgotpassword from './Forgotpassword';

function Login() {
    
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    let history = useHistory()
    let handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const loginData= await axios.post(`${env.api}/user/login`,{userName,password})
            setUser({...user, err: '', success: loginData.data.msg})
            window.localStorage.setItem('firstlogin',true)

            // alert(loginData.data.message)
            history.push("/drive")
        } catch (err) {
            // console.log(error)
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
        // await axios.post(`${env.api}/register`,{userName,password})
        
    }
    return (
        <>
        {/* <h1>login</h1> */}
        <body class="text-center">
            <main class="form-signin">
                <form onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                    <img class="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                    
                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={userName} onChange={e =>setUsername(e.target.value)} />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} />
                        <label for="floatingPassword">Password</label>
                    </div>
    
                    <div class="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                            
                        </label>
                    </div>
                    <input class="w-100 btn btn-lg btn-primary" type="submit" value="Login "/>
                    <Link to="/forgot_pwd" className="register">Forgot Password</Link>
                    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
                    {err&& showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                <span>New user </span><Link to="/register" className="register"> Register</Link>
            </main>
        </body>
    </>
    )
}

export default Login
