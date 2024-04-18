// import { onValue, ref, remove } from "firebase/database";
// import React, { useState } from "react";
// import Table from "react-bootstrap/Table";
// import { AiOutlineDelete } from "react-icons/ai";
// import { db } from "../firebase";
// import { Link } from "react-router-dom";
// import { useUserAuth } from "../contexts/UserAuthContext";
// import styled from "styled-components";

// const StatusTD = styled.td`
//   font-weight: bold;
//   color: ${(props) => (props.type === "Pending" ? "blue" : "")};
//   color: ${(props) => (props.type === "Accepted" ? "green" : "")};
//   color: ${(props) => (props.type === "Rejected" ? "red" : "")};
// `;

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const { user } = useUserAuth();

//   React.useEffect(() => {
//     onValue(ref(db, "/bookings/"), (snapshot) => {
//       setBookings([]);
//       const data = snapshot.val();
//       if (data !== null) {
//         // eslint-disable-next-line array-callback-return
//         Object.values(data).map((todo) => {
//           if (todo.refID === user.email) {
//             setBookings((oldArray) => [...oldArray, todo]);
//           }
//         });
//       }
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const deleteBooking = (dlt) => {
//     remove(ref(db, `/bookings/${dlt.id}`));
//   };
//   return (
//     <>
//       {bookings.length > 0 ? (
//         <Table
//           striped
//           bordered
//           hover
//           size="sm"
//           style={{ marginTop: "80px", width: "80%", margin: "80px auto" }}
//         >
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Room type</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Capactiy</th>
//               <th>Price</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.id}>
//                 <>
//                   <td>{booking.id}</td>
//                   <td>{booking.type.toUpperCase()}</td>
//                   <td>{booking.startDate}</td>
//                   <td>{booking.endDate}</td>
//                   <td>{booking.capacity}</td>
//                   <td>{booking.totalPrice}</td>
//                   <StatusTD type={booking.status}>{booking.status}</StatusTD>
//                   <td style={{textAlign : "center"}} >
//                     <AiOutlineDelete
//                       color="red"
//                       style={{ cursor: "pointer", fontSize: "20px" }}
//                       onClick={() => deleteBooking(booking)}
//                     />
//                   </td>
//                 </>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <div className="container roomerror">
//           <div className="row my-5">
//             <div className="col-md-6 col-12 mx-auto">
//               <div className="card shadow-lg border-0 p-4 error">
//                 <h1 className="text-center display-4">No bookings.</h1>
//                 <h3>Click below to start Booking!.</h3>
//                 <Link to="/rooms" className="btn btn-warning mt-4 ">
//                   Start Booking.
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Bookings;


import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";
import styled from "styled-components";
import axios from 'axios';

const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === "Pending" ? "blue" : "")};
  color: ${(props) => (props.type === "Accepted" ? "green" : "")};
  color: ${(props) => (props.type === "Rejected" ? "red" : "")};
`;

const Bookings = ( { bookingId, userId } ) => {
  const [bookings, setBookings] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        // Make a request to fetch user-specific bookings from the API
        // const response = await fetch(`/api/users/${user.id}/bookings`);
        const response = await fetch(`http://localhost:3001/users/${user.id}/bookings`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBookings(data);
        } else {
          console.error("Failed to fetch user bookings:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    fetchUserBookings();
  }, [user.id]);

  // const handleDeleteBooking = async (bookingId) => {
  //   try {
  //     // Make a DELETE request to the backend API endpoint
  //     await axios.delete(`http://localhost:3001/users/${user.id}/bookings/${bookingId}`);
  //     // Update the state to reflect the booking is deleted
  //     setDeleted(true);
  //   } catch (error) {
  //     console.error('Error deleting booking:', error);
  //     // Handle error appropriately, such as displaying an error message to the user
  //   }
  // };

  const handleDeleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) {
      return;
    }
  
    try {
      await axios.delete(`http://localhost:3001/users/${user.id}/bookings/${bookingId}`);
      // Remove the deleted booking from the state
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      // Optionally, you can set a flag to indicate successful deletion
      setDeleted(true);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };
  
  return (
    <>
      {bookings.length > 0 ? (
        <Table striped bordered hover size="sm" style={{ marginTop: "80px", width: "80%", margin: "80px auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Room type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Days</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <>
                  <td>{booking.id}</td>
                  {/* <td>{booking.type.toUpperCase()}</td> */}
                  <td>{booking.room_type ? booking.room_type.toUpperCase() : ''}</td> {/* Add a check for booking.type */}
                  {/* <td>{booking.start_date}</td> */}
                  {/* <td>{booking.end_date}</td> */}
                  <td>{new Date(booking.start_date).toLocaleDateString('en-GB')}</td>
                  {/* <td>{new Date(booking.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td> */}
                  <td>{new Date(booking.end_date).toLocaleDateString('en-GB')}</td>
                  {/* <td>{new Date(booking.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td> */}

                  <td>{booking.days_left}</td>
                  <td>{booking.capacity}</td>
                  <td>{booking.total_price}</td>
                  <StatusTD type={booking.status}>{booking.status}</StatusTD>
                  <td style={{ textAlign: "center" }}>
                    <AiOutlineDelete
                      color="red"
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      onClick={() => handleDeleteBooking(booking.id)} // Pass booking id as argument

                    />

                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="container roomerror">
          <div className="row my-5">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card shadow-lg border-0 p-4 error">
                <h1 className="text-center display-4">No bookings.</h1>
                <h3>Click below to start Booking!.</h3>
                <Link to="/rooms" className="btn btn-warning mt-4 ">
                  Start Booking.
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
