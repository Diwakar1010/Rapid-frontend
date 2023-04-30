import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/LoginPage.css"
import logo from "../images/logo.jpg"



const LoginPage = () => {
    const [lemail, setLemail] = useState("")
    const [lpass, setLpass] = useState("")
    // const [val,setVal]= useState("")

    const handlebtn = async (e) => {
        const formData = new FormData();
        formData.append("email", lemail)
        formData.append("password", lpass)
        // console.log(formData)
        await fetch("https://car-rental-service.onrender.com/login", {
            method: "POST",
            body: formData
        }).then((res)=>{
            return res.json()
            // console.log(res.json())
        }).then((data)=>{
            console.log(data)
            if(data.status ==="success" ){
                localStorage.setItem("jwtoken",data.token)
                localStorage.setItem("name",data.user_name)
            }
            if(data.token ){
                window.location="/"
            }
        })
    }
    
    return (
        <>
            <div className='login-links' >
                <Link to="/register" ><div className='l-link'>REGISTER</div></Link>
                <Link to="/login"  ><div className='l-link'>LOGIN</div></Link>
                <Link to="/"  ><div className='l-link'>HOME</div></Link>
                <section className="logosec">
                <img src={logo} alt="logo"/>
                <h3>CBS</h3>
                </section> 
            </div>
            <div className='login-container'>
                <h2>Login</h2>
                <div className='login-form'>
                    <label htmlFor="login-mail" > Username or Email :</label>
                    <input type="email" id="login-mail" placeholder="Email" value={lemail} onChange={(e) => { setLemail(e.target.value) }} />
                    <label htmlFor="login-password">Password:</label>
                    <input type="password" id="login-password" placeholder="Password" value={lpass} onChange={(e) => { setLpass(e.target.value) }} />
                    <button disabled={!(lpass.length&&lemail.length)} onClick={handlebtn} className="login-btn" >Login</button>
                </div>
            </div>
        </>
    )
}

export default LoginPage;