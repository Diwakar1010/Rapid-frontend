import { Link } from "react-router-dom";
import "../styles/HomePage.css"
import logo from "../images/logo.jpg"
import { useState } from "react";
import BookPage from "./BookPage";
// import car1 from "../images/homeCar.png"


const HomePage = () => {
    const [beLogin, setBeLogin] = useState('')
    const [card, setCard] = useState(false)



    const auths = localStorage.getItem("jwtoken")
    const logout = () => {
        localStorage.removeItem("jwtoken")
        localStorage.removeItem("name")
        window.location = "/"
    }
    return (
        <>
            <header className="register-links">
                {auths ? <div className="reg-link" onClick={logout}>LOGOUT</div> : <></>}
                <Link to="/register"><div className="reg-link">REGISTER</div></Link>
                <Link to="/login"><div className="reg-link">LOGIN</div></Link>
                <Link to="/"><div className="reg-link">HOME</div></Link>
                <section className="logosec">
                    <img src={logo} alt="logo" />
                    <h3>CBS</h3>
                </section>
            </header>
            <div className="homecontainer">
                <div className="centered">
                    {/* <img src={car1} alt="hcar1" /> */}
                    <h1 className="title">CAR BOOKING SERVICE</h1>
                </div>
            </div>
            <div className="rightcontainer">
                <div className="centeredRight">
                    {auths ?
                        <>
                            <h1 className="sidetitle">WELCOME TO CBS!</h1>
                            <h2>BOOK A <span>CAR</span> FOR YOUR RIDE</h2>
                            <button className="bookBtn" onClick={() => { setCard(true) }} >BOOK NOW</button>

                        </> :
                        <>
                            <h1 className="sidetitle">WELCOME TO CBS!</h1>
                            <h2>BOOK A <span>CAR</span> FOR YOUR RIDE</h2>
                            <button className="bookBtn" onClick={() => { setBeLogin("Please Login/Register Before Booking a Ride") }} >BOOK NOW</button>
                            <div id="alertmsg">{beLogin}</div>
                        </>}
                </div>
            </div>
            {card ? <BookPage/>
            : <></>}
        </>

    )
}

export default HomePage;