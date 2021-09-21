import "./App.css";
import "./login.css";
import React ,{useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import env from "./settings"
import {Link} from "react-router-dom"
import {showErrMsg,showSuccessMsg} from "./Notifications/Notification"

function Register() {
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");
    const history = useHistory()
    let handleSubmit = async(e) => {
        e.preventDefault()
        const isMatch = (password, confirmPassword) => {
            if(password === confirmPassword) return true
            return false
        }
        if(!isMatch(password, confirmPassword))
            return setUser({...user, err: "Password did not match.", success: ''})
            
        try {
            let registerData = await axios.post(`${env.api}/user/register`,{firstName,lastName,userName,password})
            setUser({...user, err: '', success: registerData.data.msg})
            history.push("/")
        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
        // await axios.post(`${env.api}/register`,{userName,password})
        
    }
    return (
        <>
        <body class="text-center">
        <main class="form-signin">
           
            <form onSubmit={(e) => {
                    handleSubmit(e);
                }}
                >
                <img class="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput"  placeholder="FirstName" value={firstName} onChange={e =>setFirstname(e.target.value)} />
                    <label for="floatingInput">First Name</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput"  placeholder="LastName" value={lastName} onChange={e =>setLastname(e.target.value)} />
                    <label for="floatingInput">Last Name</label>
                </div>
                <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput"  placeholder="name@example.com" value={userName} onChange={e =>setUsername(e.target.value)} />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password" 
                        value={password} onChange={e =>setPassword(e.target.value)}
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating">
                    <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={confirmPassword} onChange={e =>setConfirmpassword(e.target.value)}
                    />
                    <label for="floatingPassword">Confirm Password</label>
                </div>

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <input
                    class="w-100 btn btn-lg btn-primary"
                    type="submit"
                    value="Sign up"
                />
                <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
                    {err&& showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <span>Already have account </span><Link to="/" className="register"> Login</Link>
        </main>
    </body>
</>
    )
}

export default Register
