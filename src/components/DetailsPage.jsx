import addDays from 'date-fns/addDays'
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import '../styles/DetailsPage.css'
import React from 'react';
import Swal from 'sweetalert2'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import logo from "../images/logo.jpg"
import "react-datepicker/dist/react-datepicker.css";



const DetailsPage = () => {
    const location = useLocation()
    const { state_name, dist_name, car_name, price_value } = location.state
    const [startDate, setStartDate] = useState(new Date());
    // console.log()
    const user_name = localStorage.getItem("name")
    // const user_email = localStorage.getItem("email")
    const handleSubmit = async () => {
        const formData = new FormData()
        let Arr = JSON.stringify(startDate).split('T')
        formData.append("selected_state", state_name)
        formData.append("selected_district", dist_name)
        formData.append("selected_car_name", car_name)
        formData.append("selectes_price_value", price_value)
        formData.append("selected_slot", Arr[0])
        formData.append("selected_name", user_name)
        // formData.append("selected_email", user_email)
        // console.log(formData)

        await fetch("https://car-rental-service.onrender.com/details", {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (data.status === "success") {
                // console.log("vastundaa")
                Swal.fire({
                    title: 'Success',
                    text: 'Booking is Done and details sent to mail',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  }).then(()=>{
                    window.location = "/"
                  })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    const auths = localStorage.getItem("jwtoken")
    const logout = () => {
        localStorage.removeItem("jwtoken")
        localStorage.removeItem("name")
        // localStorage.removeItem("email")
        window.location = "/"
    }

    return ( 
        <div>
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
            <table>
                <tr className='t-h'>
                    <th>State</th>
                    <th>District</th>
                    <th>Car-name</th>
                    <th>Price</th>
                </tr>
                <tr>
                    <td>{state_name} </td>
                    <td> {dist_name}</td>
                    <td>{car_name}</td>
                    <td>{price_value}</td>
                </tr>
            </table>
           <div className='dating'>
            <h2>Book Your Day here:</h2>
           <DatePicker  dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} minDate={new Date()} maxDate={addDays(new Date(), 90)} />
           <button className='btn_details' onClick={handleSubmit} >Submit</button>
           </div>
           {/* {JSON.stringify(startDate)} */}
           
        </div>
    )
}

export default DetailsPage