import React, {useState} from 'react'
import { Component } from 'react'
import {SidebarData} from './sidebarData'
import {Link} from 'react-router-dom'
import { IconContext } from 'react-icons/lib'
import Home from './AdminComponents/Home'
import DoctorList from './AdminComponents/DoctorList'
import AdminPatientlist from './AdminComponents/AdminPatientlist'

export default function Admin () {
    const [active, setActive]= useState("Home")
    
       
       
        
        return (
            <div className="row">
                <IconContext.Provider value={{color:"#fff"}}>
                <div className="col s12 m6"style={{
                         marginTop: "60px",
                        backgroundColor:"#060b26",
                        width:"250px",
                        height:"100vh",
                        // display:"flex",
                        position:"fixed",
                        justifyContent: "center",
                        top: "0"
                    }}>
               {SidebarData.map((item, index)=>{
                   return(
                    <li key={index} className="" style={{
                        listStyle:"none",
                        padding:"25px 0px 8px 0px",
                        alignItems:"center",
                        display:"flex",
                        justifyContent:"start"
                    }} >
                        <button className="" style={{
                        backgroundColor:"#060b26",
                        width:"250px",
                        border:"none"    
                        }}
                        onClick={()=>setActive(item.title)}>
                            
                            {item.icon}
                            <span className="white-text" style={{paddingLefts:"10px"}}>{item.title}</span>
                        </button>
                    </li>
                   )
               })}
               </div>
               </IconContext.Provider>
               <div className="col s12 m9 offset-m2">
                   {active=== "Home" && <Home/>}
                   {active=== "Doctors" && <div><DoctorList/></div>}
                   {active=== "Users" && <div><AdminPatientlist/></div>}
                   {active=== "Consultations" && <div>These are the consultations</div>}
                   {active=== "Add General Physician" && <div>Add GP</div>}
                   </div>
            </div>
        )
    
   
}

