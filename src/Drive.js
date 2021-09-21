import React from 'react'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import "./login.css";
import "./App.css";
import axios from 'axios';
import env from "./settings"
import {showErrMsg, showSuccessMsg} from './Notifications/Notification'

function Drive() {
    let history = useHistory()
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    let handleSubmit = async(e) => {
        e.preventDefault()
        
        try {
            let logout = await axios.get(`${env.api}/user/logout`)
            window.localStorage.removeItem('firstlogin')
            setUser({...user, err: '', success: logout.data.msg})
            // window.location.href = "/";
            history.push('/')
        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
            // window.location.href = "/";
        }
        
    }
    return (
        
            <body class="text-center">
                <main class="form-signin">

                    <form onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        <h1>Welcome to drive</h1>
                        <input class="w-100 btn btn-lg btn-primary" type="submit" value="Logout"/>
                    </form>
                </main>
            </body>
    )
        
}

export default Drive
