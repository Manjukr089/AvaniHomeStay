// import React from "react";
// import { Link } from "react-router-dom";
// import defaultImg from "../images/room-1.jpeg";

// export default function Room({ room }) {
//   const { name, slug, images, price } = room;
//    // Check if images exists and is an array
//    const roomImage = images && images.length > 0 ? images[0] : defaultImg;
//   return (
//     <div className="col-md-4 col-12 mx-auto p-2">
//       <div className="card shadow-lg border-0 room">
//         <img
//           src={images[0] || defaultImg}
//           alt="single room"
//           className="img-fluid"
//         />
//         <div className="price-top">
//           <h6>Rs {price}</h6>
//           <p>per night</p>
//         </div>
//         <Link
//           to={`/rooms/${slug}`}
//           className="btn-warning room-link text-center"
//         >
//           Features
//         </Link>
//         <p className="room-info">{name}</p>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";

const Room = ({ room }) => {
  const { name, id, images, price } = room;
  const roomImage = images && images.length > 0 ? images[0] : defaultImg;

  return (
    <div className="col-md-4 col-12 mx-auto p-2">
      <div className="card shadow-lg border-0 room">
        <img
          src={roomImage}
          alt="single room"
          className="img-fluid"
        />
        <div className="price-top">
          <h6>Rs {price}</h6>
          <p>per night</p>
        </div>
        <Link
          to={`/rooms/${id}`}
          className="btn-warning room-link text-center"
        >
          Features
        </Link>
        <p className="room-info">{name}</p>
      </div>
    </div>
  );
};
export default Room;
