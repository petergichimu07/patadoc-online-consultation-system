import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import firebase from "./../../config/fbConfig";

const feedback = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  
  const handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
 const handleSubmit = (e, rating) => {
    const db = firebase.firestore();
    db.collection("reviews").add({
        rating: "test",
        feedback: feedback,

      });
    // this.props.history.push("/");
  };
  return (
    <div className="container left-align">
      <div className="card">
          <div className="card-title center-align">Feedback</div>
     
      <form onSubmit={handleSubmit}>
      <p>Rate the quality of services received</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                required
              />
              <FaStar
                size={30}
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
 <div className="input-field">
          <label htmlFor="feedback">Type your Feedback</label>
          <input
            type="text"
            id="feedback"
            onChange={this.handleChange}
            required
          />
        </div>
        <button className="btn red lighten-1 waves-effect center-align waves-dark z-depth-0">
                  Submit
                </button>
      </form>
    </div>
      </div>
  );
};
export default feedback;
