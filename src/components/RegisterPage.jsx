import { useState } from "react"
import "../styles/RegisterPage.css"
import { Link, useNavigate } from "react-router-dom"
import logo from "../images/logo.jpg"



const RegisterPage = () => {
    const his = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [conPass,setConPass] = useState("")

    const handlebtn = async () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        // formData.append("confirmPassword" ,conPass)
        // console.log(formData)

        await fetch("https://car-rental-service.onrender.com/reg", {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            // console.log(data)
            if (data.status === "success") {
                // localStorage.setItem("name1",data.userData.name)
                // localStorage.setItem("email",data.userData.email)
                 his("/login")
            }
        })
    }
    return (
        <>
            <div className="register-links">
                <Link to="/register"><div className="reg-link">REGISTER</div></Link>
                <Link to="/login"><div className="reg-link">LOGIN</div></Link>
                <Link to="/"><div className="reg-link">HOME</div></Link>
                <section className="logosec">
                <img src={logo} alt="logo" />
                <h3>CBS</h3>
                </section>  
            </div>

            <div className="register-container">
                <h2>Registration</h2>
                <div className='reg-form'>
                    <label htmlFor="reg-text">Name:</label>
                    <input type="text" id="reg-text" placeholder="Fullname" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <label htmlFor="reg-mail">Email:</label>
                    <input type="email" id="reg-mail" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <label htmlFor="reg-password">Password:</label>
                    <input type="password" id="reg-password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    {/* <label htmlFor="reg-cpass">Confirm-Password:</label>
                    <input type="password" id="reg-cpass" placeholder="Confirm-Password" value={conPass} onChange={(e)=>{setConPass(e.target.value)}}/> */}
                    <button onClick={handlebtn} className="reg-btn" >Register</button>
                </div>
            </div>
        </>

    )
}

export default RegisterPage;