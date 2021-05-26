import React, { useState } from "react";
import { Link, link } from "react-router-dom";
import {connect} from 'react-redux';

import "./Join.css";

const Join = (props) => {
  // this part uses react hooks to create the interface. this is the interface for the joining
  const name=props.profile.firstName;
  
  const [room, setRoom] = useState("");

  const submit = () => {
    if (name !== "" && room !== "")
      window.location.href = `/chat?name=${name}&room=${room}`;
  };

  return (
    
      <div className=" z-index-4 container joinInnerContainer">
        <h1 className="card-title">Join</h1>
       
        <div className="input-field">
            <label htmlFor="text">Name of Room</label>
          <input
            
            className="text-grey"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>

        <button className="btn red lighten-1 waves-effect waves-dark z-depth-0" onClick={submit} type="submit">
          GO
        </button>
      </div>
    
  );
};
const mapStateToProps =(state)=>{
  console.log(state);
   return {
      auth: state.firebase.auth,
      profile:state.firebase.profile
   }
 }
export default connect(mapStateToProps)(Join);
