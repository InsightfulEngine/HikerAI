import React from "react";
import { Link } from "react-router-dom";

function TextBlock() {
  return (
    <div id="textblock">
      <div id="textblock-container">
        <h1 id="textblock-title">What is HikerAI?</h1>
        <p id="textblock-content">
          <br />
          Discover the best hiking trails in New York City with HikerAI. We
          provide you with the best trails, so you can enjoy the great outdoors
          without any hassle.
        </p>
        <br /> <br />
      </div>
      <div className="flex justify-center">
        <Link to="/search">
          <button className="text-white flex justify-center">
            Find a Hiking Trail
          </button>
        </Link>
      </div>
      <footer id="textblock-footer">Created With By HikerAI Team</footer>
    </div>
  );
}

export default TextBlock;
