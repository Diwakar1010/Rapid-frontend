// import {allDistricts} from "state-district-component"

import { useEffect, useState } from "react"
import axios from "axios"

const DistComp = ({id_ , val})=>{
    const [dist_name, setDist_name] = useState([])
   useEffect(()=>{
    axios.get("https://car-rental-service.onrender.com/dist_")
    .then((res)=>{
        let distArr = []
        for(let i=0;i<res.data.length;i++){
            if(id_ === res.data[i].state_id){
                distArr.push(res.data[i].name)
            }
        }
        setDist_name(distArr)
    }).catch((err)=>{
        console.log(err)
    })
   },[id_])
    return(
        <>
         {dist_name.map((val, ke) => {
                    return (
                         <option key={ke} value={val} >{val}</option>
                    )
                })} 
        </>
    )
}

export default DistComp