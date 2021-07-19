import React from "react";
import { Link } from "react-router-dom";

import SignedInLinks from "./SignedInLink";
import SignedOutLinks from "./SignedOutLink";
import { connect } from "react-redux";
import menuIcon from "../../icons/menuIcon.png";

const Navbar = (props) => {
  const { auth, profile } = props;
  console.log(profile);
  const links = auth.uid ? (
    <SignedInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );
  return (
    <nav
      className="nav-wrapper  slidenav"
      style={{ 
        background: "#2979FF", 
        position: "fixed",
        zIndex: 12,
        margin:0,
        top:0,
      }}
    >
      <div className="container">
        
        <ul className=" hide-on-med-and-downn navlist">{links}</ul>
        <ul className="sidenav" id="mobile-demo">
          {links}
        </ul>
        <div className="left-align ">
        <Link to="/" className="brand-logo" >
         <h5 className="navHeading"style={{fontSize:"2vw"}}>Online Patient-Specialist Consultation System</h5> 
        </Link>
        </div>
        
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  console.log(state.firebase.profile.type);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default connect(mapStateToProps)(Navbar);
