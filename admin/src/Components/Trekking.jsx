import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";

const Trekking = ({ room }) => {
  const { name, id, images, price } = room;
  const roomImage = images && images.length > 0 ? images[0] : defaultImg;

  return (
    <div className="col-md-4 col-12 mx-auto p-2">
      <div className="card shadow-lg border-0 room">
        <img
          src={roomImage}
          alt="trekking"
          className="img-fluid"
        />
        <div className="price-top">
          <h6>Rs {price}</h6>
          <p>per head</p>
        </div>
        <Link
          to={`/trekkings/${id}`}
          className="btn-warning room-link text-center"
        >
          Features
        </Link>
        <p className="room-info">{name}</p>
      </div>
    </div>
  );
};
export default Trekking;
