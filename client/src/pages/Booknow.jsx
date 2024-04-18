// import React, { useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import moment from "moment";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { ref, set } from "firebase/database";
// import { db } from "../firebase";
// import { uid } from "uid";
// import { useSelector } from "react-redux";
// import { useUserAuth } from "../contexts/UserAuthContext";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

// export default function Booknow() {
//   const { user } = useUserAuth();
//   const state = useSelector((state) => state);
//   const { id } = useParams();
//   const [fullNmae, setFullNmae] = useState("");
//   const [value, setValue] = useState(0);
//   const [cnic, setCnic] = useState(0);
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [persons, setPersons] = useState();
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const navigate = useNavigate();
//   const uuid = uid();

//   function handleName(name) {
//     setFullNmae(name.target.value);
//   }
//   function handlepersons(val) {
//     setPersons(val.target.value);
//   }
//   function handleemail(val) {
//     setEmail(val.target.value);
//   }
//   function handleaddress(val) {
//     setAddress(val.target.value);
//   }
//   function handleCnic(val) {
//     setCnic(val.target.value);
//   }
//   function handleChangeStart(date) {
//     setStartDate(date);
//   }


//   function handleChangeEnd(date) {
//     setEndDate(date);
//   }

//   function calculateDaysLeft(startDate, endDate) {
//     if (!moment.isMoment(startDate)) startDate = moment(startDate);
//     if (!moment.isMoment(endDate)) endDate = moment(endDate);
//     return endDate.diff(startDate, "days");
//   }

//   function getRoom(arg) {
//     const idiRooms = state[0].rooms.map((item) => item);
//     const roomDatas = idiRooms.filter((roomItem) => roomItem.slug === arg);
//     return roomDatas;
//   }

//   const room = getRoom(id);
//   var daysLeft = calculateDaysLeft(startDate, endDate);

//   const formattedDate = startDate
//     .toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     })
//     .replace(/ /g, "-");

//   const formattedEndDate = endDate
//     .toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     })
//     .replace(/ /g, "-");

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useUserAuth } from "../contexts/UserAuthContext";

export default function Booknow() {
  const { user } = useUserAuth();
  const state = useSelector((state) => state);

  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [fullNmae, setFullNmae] = useState("");
  const [phoneNumber, setValue] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [persons, setPersons] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDateAvailable, setIsDateAvailable] = useState(true); // Flag to indicate if the selected date range is available

  const navigate = useNavigate()
  useEffect(() => {
    fetchRoomDetails(id);
  }, [id]);

  const fetchRoomDetails = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:3001/rooms/${roomId}`);
      const data = await response.json();
      console.log("Room details response:", response);
      console.log("Room details data:", data);
      setRoom(data[0]);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };
  const BASE_IMAGE_URL = 'http://localhost:3001/uploads/';

  const handleName = (event) => {
    setFullNmae(event.target.value);
  };

  const handlepersons = (event) => {
    setPersons(event.target.value);
  };

  const handleemail = (event) => {
    setEmail(event.target.value);
  };

  const handleaddress = (event) => {
    setAddress(event.target.value);
  };

  const handleCnic = (event) => {
    setCnic(event.target.value);
  };

  const handleChangeStart = (date) => {
    setStartDate(date);
    setEndDate(date); // Reset the end date when start date changes
    // Check if the selected date range is available
    checkDateAvailability(date, endDate);
  };

  const handleChangeEnd = (date) => {
    setEndDate(date);
    // Check if the selected date range is available
    checkDateAvailability(startDate, date);
  };

  const checkDateAvailability = async (startDate, endDate) => {
    try {
      const response = await fetch(
        `http://localhost:3001/check-availability?roomId=${id}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      console.log("Date availability response status:", response.status);
      const data = await response.json();
      console.log("Date availability response:", response);
      console.log("Date availability data:", data);
      return data.available;
    } catch (error) {
      console.error("Error checking date availability:", error);
      return false;
    }
  };
  


  const calculateDaysLeft = () => {
    const startDateMoment = moment(startDate);
    const endDateMoment = moment(endDate);
    return endDateMoment.diff(startDateMoment, "days");
  };

  const handlePhoneChange = (event) => {
    // Extract the phone number from the event
    const phoneNumber = event.target.value;
    // Set the phone number in the state
    setValue(phoneNumber);
  };


  const writeToDatabase = async () => {
    try {
      // Check if any required fields are empty
      if (!fullNmae || !address || !cnic || !email || !phoneNumber || !persons || !startDate || !endDate) {
        alert("Please fill all fields");
        return;
      }
           // Check if the start date or end date is not selected
           if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }


      // Check if the selected date range is available
      console.log("Before checking date availability:", startDate, endDate);
      const isDateAvailable = await checkDateAvailability(startDate, endDate);
      console.log("After checking date availability:", isDateAvailable);
      if (!isDateAvailable) {
        alert("Sorry, the selected date range is already booked.");
        return;
      }

      console.log("Date range is available. Proceeding with booking...");


      const daysLeft = calculateDaysLeft();

      // Check if the number of persons exceeds room capacity
      if (persons > room.capacity) {
        alert("Please check the capacity of the room.");
        return;
      }

      // Check if start date and end date are selected
      if (daysLeft === 0) {
        alert("Please select the dates.");
        return;
      }

      // Convert dates to ISO string format
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      // Construct the booking data object
      const bookingData = {
        fullNmae,
        phoneNumber,
        cnic,
        address,
        email,
        persons,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        roomId: id,
        user: user, // Include user details fetched from the server
        totalPrice: totalPrice,
        daysLeft: daysLeft,
      };
      console.log("Booking data:", bookingData);

      // Send booking data to the server
      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      // Check if the booking was successful
      if (response.ok) {
        alert("Room booked successfully!");
        // Redirect or navigate to the bookings page
        navigate('/bookings')
      } else {
        alert("Failed to book room. Please try again.");
      }
    } catch (error) {
      console.error("Error booking room:", error);
      alert("Failed to book room. Please try again.");
    }
  };

  if (!room) {
    return (
      <div className="container roomerror">
        <div className="row my-5">
          <div className="col-md-6 col-12 mx-auto">
            <div className="card shadow-lg border-0 p-4 error">
              <h1 className="text-center display-4">SORRY</h1>
              <h3>No such room could be found...</h3>
              <Link to="/rooms" className="btn btn-warning mt-4 ">
                Back to Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // const name = room[0].name;
  // const capacity = room[0].capacity;
  // const size = room[0].size;
  // const price = room[0].price;
  // const breakfast = room[0].breakfast;
  // const pets = room[0].pets;
  // const images = room[0].images;

  const name = room.name;
  const capacity = room.capacity;
  const size = room.size;
  const price = room.price;
  const breakfast = room.breakfast;
  const pets = room.pets;
  const images = room.image3;


  // const [...defaultBcg] = images;
  const daysLeft = calculateDaysLeft(); // Calculate daysLeft here

  // Calculate total price
  const totalPrice = daysLeft * room.price;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
          <div>
            <h1 className="display-4">Booking</h1>
          </div>
          <div className="row">
            <div className="col-md-6 col-12 my-auto">
              {/* <img
                src={images}
                className="img-fluid"
                alt="selected room"
              /> */}
              <img src={`${BASE_IMAGE_URL}${room.image1}`} alt={room.name} className="img-fluid" />

            </div>
            <div className="col-md-6 col-12 my-auto">
              <h1>Rooms Details</h1>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Room Type</th>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <th>Capacity</th>
                    <td>{capacity}</td>
                  </tr>
                  <tr>
                    <th>Size</th>
                    <td>{size} </td>
                  </tr>
                  <tr>
                    <th>Breakfast</th>
                    <td>{breakfast === true ? `Included` : `Not Included`}</td>
                  </tr>
                  <tr>
                    <th>Pets</th>
                    <td>{pets === true ? `Allowed` : `Not Allowed`}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          {/* <div className="row my-3">
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="Fromdate" className="font-weight-bolder mr-3">
                  From Date{" "}
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleChangeStart}
                  // minDate={moment().toDate()}
                  minDate={new Date()} // Set minDate to current date
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="Todate" className="font-weight-bolder mr-3">
                  To Date{" "}
                </label>
                <DatePicker
                  selected={endDate}
                  minDate={startDate} // Set minDate to the selected start date
                  // minDate={moment().toDate()}
                  onChange={handleChangeEnd}
                  dateFormat="dd/MM/yyyy" // Set the date format

                  className="form-control"
                />
              </div>
            </div>
          </div> */}
          <div className="row">
  <div className="col-md-6 col-12 my-auto">
    <div className="form-group">
      <label htmlFor="Fromdate" className="font-weight-bolder mr-3">
        From Date{" "}
      </label>
      <DatePicker
        selected={startDate}
        onChange={handleChangeStart}
        minDate={moment().toDate()}
        dateFormat="dd/MM/yyyy" // Set the date format
        className="form-control"
        required
      />
    </div>
  </div>
  {endDate !== null && ( // Render the end date DatePicker only if end date is not null
    <div className="col-md-6 col-12 my-auto">
      <div className="form-group">
        <label htmlFor="Todate" className="font-weight-bolder mr-3">
          To Date{" "}
        </label>
        <DatePicker
          selected={endDate}
          minDate={startDate}
          onChange={handleChangeEnd}
          dateFormat="dd/MM/yyyy" // Set the date format
          className="form-control"
        />
      </div>
    </div>
  )}
</div>

          <div className="row">
            <div className="col-md-6 col-12">
              <h6 className="font-weight-bolder">
                Number of days : {daysLeft}
              </h6>
              <mark>Please make sure Checkin time is from 9 am to 12 pm</mark>
            </div>
            <div className="col-md-6 col-12">
              <h6 className="font-weight-bold">
                Price per day :{" "}
                <span className="badge badge-info">Rs {price}</span>
              </h6>
              <h6 className="font-weight-bold">
                Total Price to be paid :{" "}
                <span className="text-primary">Rs {totalPrice}</span>
              </h6>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-md-12 col-12 my-auto">
              <div className="col-md-12 col-12 float-right">
                <form>
                  <div className="form-group">
                    <label htmlFor="persons">No. of persons</label>
                    <input
                      type="number"
                      value={persons}
                      className="form-control"
                      onChange={handlepersons}
                      id="persons"
                      placeholder="No. of persons"
                      required
                    />
                    <label htmlFor="forName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fullNmae}
                      id="forName"
                      onChange={handleName}
                      placeholder="Full name"
                      required
                    />
                    <label htmlFor="Number">Phone Number</label>
                    {/* <PhoneInput */}
                    {/* <input
                      type="number"
                      className="form-control"
                      id="number"
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                    /> */}
                    <input
                      type="number"
                      className="form-control"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      id="number"
                      required
                      placeholder="Enter phone number"
                    />


                    <label htmlFor="CNIC">AdharCard Number</label>
                    <input
                      type="number"
                      className="form-control"
                      value={cnic}
                      onChange={handleCnic}
                      required
                      id="CNIC"
                      placeholder="ADHAR CARD NUMBER"
                      // maxLength={12}
                      max={12}
                    />
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={handleaddress}
                      id="address"
                      placeholder="Your address"
                      required
                    />

                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={handleemail}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      required
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>

                  <div className="form-group form-check"></div>
                </form>
                <button
                  className="btn btn-block btn-outline-primary"
                  data-toggle="modal"
                  data-target="#thanks"
                  onClick={writeToDatabase}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
