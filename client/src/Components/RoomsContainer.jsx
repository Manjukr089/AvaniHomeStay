// import React from "react";
// // import RoomsFilter from "./RoomsFilter";
// import RoomsList from "./RoomsList";
// import Loading from "./Loading";
// import { useSelector } from "react-redux";
// import RoomsFilter from "./RoomsFilter";

// export default function RoomsContainer() {
//   const state = useSelector((state) => state);
//   return (
//     <>
//       {state.length > 0 ? (
//         <>
//           <RoomsFilter rooms={state[0].rooms} />
//           <RoomsList rooms={state[0].sortedRooms} />
//         </>
//       ) : (
//         <Loading />
//       )}
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchRooms } from './actions';
import RoomsList from './RoomsList';
import Loading from './Loading';
import { fetchRooms } from '../Redux/actions';

export default function RoomsContainer() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch rooms data from API
    fetch('http://localhost:3001/rooms')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        return response.json();
      })
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
 

  return (
    <>
      {loading ? (
        <Loading message="Rooms data loading..." />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <RoomsList rooms={rooms} />
      )}
    </>
  );
}
