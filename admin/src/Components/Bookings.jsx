import { onValue, ref, update } from "firebase/database";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import moment from "moment";

const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === "Pending" ? "blue" : "")};
  color: ${(props) => (props.type === "Accepted" ? "green" : "")};
  color: ${(props) => (props.type === "Rejected" ? "red" : "")};
`;
const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  // React.useEffect(() => {
  //   onValue(ref(db, "/bookings/"), (snapshot) => {
  //     setBookings([]);
  //     const data = snapshot.val();
  //     if (data !== null) {
  //       // eslint-disable-next-line array-callback-return
  //       Object.values(data).map((booking) => {
  //         setBookings((oldArray) => [...oldArray, booking]);
  //       });
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        // Make a request to fetch user-specific bookings from the API
        const response = await fetch(`http://localhost:3001/bookings`);
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
  }, []);

  // const updateBooking = (bookingNumb, status) => {
  //   update(ref(db, `bookings/${bookingNumb}`), {
  //     status,
  //   });
  // };

  // const updateBooking = async (bookingId, status) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/updateBooking/${bookingId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ status }),
  //     });
  
  //     if (response.ok) {
  //       console.log("Booking updated successfully");
  //       // Optionally, you can update the state or perform any other actions upon successful update
  //     } else {
  //       console.error("Failed to update booking:", response.statusText);
  //       // Handle error scenario
  //     }
  //   } catch (error) {
  //     console.error("Error updating booking:", error);
  //     // Handle error scenario
  //   }
  // };

  //!worked
  const updateBooking = async (bookingId, status) => {
    try {
      const response = await fetch(`http://localhost:3001/updateBooking/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
  
      if (response.ok) {
        if (status === "Rejected") {
          // Call API to update room availability
          await fetch(`http://localhost:3001/check-availability/${bookingId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: bookings.start_date,
              endDate: bookings.end_date,
              available: true,
            }),
          });
        }
        // Update the state of bookings after successful update
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status } : booking
          )
        );
        console.log("Booking updated successfully");
      } else {
        console.error("Failed to update booking:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };
  
  // const updateBooking = async (bookingId, status) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/updateBooking/${bookingId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ status }),
  //     });
  
  //     if (response.ok) {
  //       if (status === "Rejected") {
  //         // Call API to update room availability
  //         await fetch(`http://localhost:3001/update-date-availability/${bookingId}`, {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             startDate: bookings.start_date,
  //             endDate: bookings.end_date,
  //             available: true,
  //           }),
  //         });
  //       }
  //       // Update the state of bookings after successful update
  //       setBookings((prevBookings) =>
  //         prevBookings.map((booking) =>
  //           booking.id === bookingId ? { ...booking, status } : booking
  //         )
  //       );
  //       console.log("Booking updated successfully");
  //     } else {
  //       console.error("Failed to update booking:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error updating booking:", error);
  //   }
  // };
  
  
  console.log(bookings);
  return (
    <>
      {bookings ? (
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px", width: "90%", margin: "80px auto" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Room type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Capactiy</th>
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
                  <td>{booking.full_name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.room_type && booking.room_type.toUpperCase()}</td>
                  <td>{moment(booking.start_date).format("DD/MM/YYYY")}</td>
                  <td>{moment(booking.end_date).format("DD/MM/YYYY")}</td>
                  <td>{booking.persons}</td>
                  <td>{booking.total_price}</td>
                  <StatusTD type={booking.status}>{booking.status}</StatusTD>
                  {booking.status === "Pending" ? (
                    <>
                      <td style={{ textAlign: "center" }}>
                        <FaCheckCircle
                          color="green"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(booking.id, "Accepted")}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <FaTimesCircle
                          color="red"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(booking.id, "Rejected")}
                        />
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
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
                <Link to="/rooms" className="btn btn-warning mt-4 ">
                  No Bookings
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
