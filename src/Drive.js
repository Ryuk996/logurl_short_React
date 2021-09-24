import React from 'react'
import { useHistory } from "react-router-dom"
import { useState, useEffect } from 'react'
import "./login.css";
import "./App.css";
import "./logoutbtn.css"
import axios from 'axios';
import env from "./settings"
import { showErrMsg, showSuccessMsg } from './Notifications/Notification'

function Drive(props) {
    let history = useHistory()
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const [urlLink, setUrlLink] = useState("");
    const [showUrls, setUrl] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const { err, success } = user

    let fetchUrl = async () => {
        try {
            let url = await axios.get(`${env.api}/url/showUrl`)

            setUrl([...url.data])

            setLoading(false)
        }
        catch (error) {
            console.log(error);
            setLoading(false)
        }


    }
    // useEffect(async () => {
    //     try {
    //         let url = await axios.get(`${env.api}/url/showUrl`)

    //         setUrl([...url.data])

    //         setLoading(false)
    //     }
    //     catch (error) {
    //         console.log(error);
    //         setLoading(false)
    //     }


    // }, [])

    let handleSubmit = async (e) => {

        e.preventDefault()
        try {
            let createurl = await axios.post(`${env.api}/url/createUrl`, { urlLink })
            // setUrl([...createurl.data])
            // console.log(createurl.data)
            // let rowIndex = showUrls.findIndex(obj => obj.id==id);
            // showUrls.values(rowIndex,1);
            // setUrl([...showUrls])
            // // window.location.reload()
            setUser({ ...user, err: '', success: createurl.data.msg })
            console.log(createurl)
            setUrlLink("")
            fetchUrl();


            // window.location.href = "/";

        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
            // window.location.href = "/";
        }

    }

    let handleLogout = async (e) => {
        e.preventDefault()

        try {
            let logout = await axios.get(`${env.api}/user/logout`)
            window.localStorage.removeItem('firstlogin')
            setUser({ ...user, err: '', success: logout.data.msg })
            // window.location.href = "/";
            history.push('/')
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
            // window.location.href = "/";
        }

    }
    let handleDelete = async (id) => {
        let confirm = window.confirm("Are you sure want to delete ?")
        if (confirm) {
            try {
                // let deleteaTask =await axios.delete(`http://localhost:3002/delete-task/${id}`)
                let deleteaTask = await axios.get(`${env.api}/url/delete/${id}`)
                setUser({ ...user, err: '', success: deleteaTask.data.msg })
                let rowIndex = showUrls.findIndex(obj => obj.id == id);
                showUrls.splice(rowIndex, 1);
                setUrl([...showUrls])

            }
            catch {
                console.log("error");
            }
        }
    }
    return (

        <div className="container">
            <div class="navigation">
                            <button onClick={() => handleLogout} class="button" type="submit" value="Logout" ><div class="logout">LOGOUT</div></button>
                        </div><br></br>
                        
            <div className='row'>
            <main class="form-signin">
                    <div className="col-lg-12 text center">
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        <h1>URL shortner</h1>
                    </div>
                    </main>
            </div>
            <form onSubmit={(e) => {
                handleSubmit(e);
            }}>
                <div className='row'>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Paste your url" aria-label="Recipient's username" aria-describedby="button-addon2" value={urlLink} onChange={e => setUrlLink(e.target.value)} />
                        <input class=" btn btn-lg btn-primary" type="submit" value="Submit" />
                    </div>
                </div>

            </form>
            <div className='row'>

                {showUrls.map((url) => {
                    // for (let i = 0; i < showUrls.length; i++)
                    return <div className="col-lg-3" key={url._id}>
                        {/* <div className="col-lg-3"> */}
                        <div class="card border-primary mb-3" style={{ maxWidth: "18rem" }}>
                            <div class="card-header">total click:{url.clickCount}</div>

                            <div class="card-body text-primary">
                                <h6 className="card-title">
                                    <a href={`${env.api}/url/${url.shorturlLink}`} target="_blank">
                                        {env.api}/{url.shorturlLink}
                                    </a>
                                </h6>
                                <p class="card-text">{url.urlLink}</p>
                                <button onClick={() => handleDelete(url._id)} className="btn btn-sm btn-danger">Delete</button>
                                {/* <a href={`${env.api}/url/delete/${url._id}`} className="btn btn-md btn-danger">remove</a> */}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )

}

export default Drive
