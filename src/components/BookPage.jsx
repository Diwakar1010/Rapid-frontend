import React, { useEffect, useState } from "react";
import '../styles/BookPage.css'
import DistComp from "./DistComp";
import {Link} from 'react-router-dom'
// import { allStates } from "state-district-component";
import axios from "axios"
import car_1 from '../images/car_1.jpg'
import car_2 from '../images/car_2.jpg'
import car_3 from '../images/car_3.jpg'
import car_4 from '../images/car_4.jpg'
import car_5 from '../images/car_5.jpg'
import car_6 from '../images/car_6.jpg'
import car_7 from '../images/car_7.jpg'
import car_8 from '../images/car_8.jpg'
import car_9 from '../images/car_9.jpg'
import car_10 from '../images/car_10.jpg'



const BookPage = () => {
  const [states, setStates] = useState("");
  const [district, setDistrict] = useState("")
  const [state_id, setState_id] = useState("")
  const [allStates, setAllStates] = useState([]);
  const [card, setCard] = useState(true)
  const imageArr = [{url:car_1,car_name:"toyota_5-seater",price:"800/hr"},{url:car_2,car_name:"toyota_7-seater",price:"1200/hr"},
                    {url:car_3,car_name:"volkswagon_7-seater",price:"1200/hr"},{url:car_4,car_name:"Volkswagon_5-seater",price:"800/hr"},
                    {url:car_5,car_name:"shift_5-seater",price:"800/hr"},{url:car_6,car_name:"shiftdesire_5-seater",price:"800/hr"},
                    {url:car_7,car_name:"tata_5-seater",price:"800/hr"},{url:car_8,car_name:"tata_5-seater",price:"800/hr"},
                    {url:car_9,car_name:"hondacity_5-seater",price:"1200/hr"},{url:car_10,car_name:"hondacity_5-seater",price:"1200/hr"}
                    ]

  useEffect(() => {
    axios.get("https://car-rental-service.onrender.com/states_")
      .then((res) => {
        let stateArr = []
        for (let i = 0; i < 37; i++) {
          stateArr.push(res.data[i].name)
        }
        // console.log(stateArr)
        setAllStates(stateArr)
      }).catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios.get("https://car-rental-service.onrender.com/states_")
      .then((res) => {
        let flag = true
        for (let i = 0; i < 37; i++) {
          if (states === res.data[i].name) {
            setState_id(res.data[i].id)
            flag = false
          }
        }
        if (flag === true) {
          setState_id("")
        }
      }).catch((err) => {
        console.log(err)
      })
  }, [states])

  const handleSubmit = () => {
    if (states && district) {
      setCard(false)
    }
  }

  return (
    <>
      {card ?
        < div className="card2" >
          <p className="card-titles"><b>Select the state & district here:</b> </p>
          <div className="bars">
            <label htmlFor="states-name"> <b>State:</b> </label>
            <input list="states-names" name="states-name" id="states-name" onChange={(e) => { setStates(e.target.value) }} />
            {allStates ? <datalist id="states-names">
              {allStates.map((val, ke) => {
                return <option key={ke} value={val}>{val}</option>
              })}
            </datalist> : ""}
            <label htmlFor="dist-name"><b>District:</b></label>
            <input list="dist-names" name="dist-name" id="dist-name" onChange={(e) => { setDistrict(e.target.value) }} />
            <datalist id="dist-names">
              {states ? <DistComp id_={state_id} val={states} /> : ""}
            </datalist>

            <button className="btn_sd" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        :
        <div className="card-items">
          {imageArr.map((val, i) => {
            return (
              <div key={i} className="card3">
                <img src={val.url} alt="cars"  className="card-image"/>
                <div>Car-name:{val.car_name}</div> <div>Price(perhour):{val.price}</div>
                <Link to="/details" state={{state_name:states, dist_name:district,car_name:val.car_name,price_value:val.price,key_value:""}}><button className="btn_link">Select</button></Link>
              </div>
            )
          })}
        </div>
      }
    </>
  );

}
export default BookPage;