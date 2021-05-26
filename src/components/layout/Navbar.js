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
        <a data-target="mobile-demo" className="sidenav-trigger">
          <i
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => alert("cliked")}
            className="material-icons"
          >
            <img
              className="responsive-img"
              style={{ width: "100px", color: "#fff" }}
              src={menuIcon}
              alt="Menu Icon"
            />
          </i>
        </a>
        <ul className="right hide-on-med-and-down">{links}</ul>
        <ul class="sidenav" id="mobile-demo">
          {links}
        </ul>
        <Link className="left-align" to="/" className="brand-logo">
          PataDoc
        </Link>
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
