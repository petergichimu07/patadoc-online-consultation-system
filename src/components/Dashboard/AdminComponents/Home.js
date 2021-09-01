import React from 'react'

const Home=()=>{
    return (
        <div className="container">
             <div className="card z-depth-2 project-summary" style={{ height: "200px",position:"relative", width:"200px"}}>
      <div
        className="right white-text"
        style={{
          marginTop: "10px",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        <p className='' style={{ padding: "0px 8px" }}>
          placeholder one
        </p>
      </div>
      <div className="card-content" style={{}}
      style={{
        position:"absolute",
        top: "30px",
        left:"5px",
        fontSize: "15px",
        fontWeight: "bold"

      }}>
        placeholder two
      </div>
      <div className="card-content left-align patadocpatadoc
      grey-text text-darken-3"
      style={{
        paddingTop:"",
        position:"absolute",
        top:"70px",
        left:"2px"
      }}>
        <p>placeholder</p>
      </div>
      <p
        className="grey-text text-darken-1 right-align"
        style={{
          fontSize: "12px",
          position: "absolute",
          bottom:"2px",
          right:"2px",
          fontWeight:"bold"
          
        }}
      >
        new content
      </p>
    </div>
        </div>
    )
}

export default Home
