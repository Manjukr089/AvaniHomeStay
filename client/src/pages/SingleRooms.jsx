import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Banner from "../Components/Banner";
import StyledHero from "../Components/StyledHero";
import { useState, useEffect } from "react";
import { useUserAuth } from "../contexts/UserAuthContext"; // Import the user authentication context
import { useNavigate } from "react-router-dom"; 

const SingleRooms = () => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState(null);
  const state = useSelector((state) => state);
  const { user } = useUserAuth(); // Get the user object from the authentication context

  function getRoom(arg) {
    const idiRooms = state[0].rooms.map((item) => item);
    const roomDatas = idiRooms.filter((roomItem) => roomItem.slug === arg);
    return roomDatas;
  }


  // const roomData = getRoom(id);
  // const name = roomData[0].name;
  // const description = roomData[0].description;
  // const capacity = roomData[0].capacity;
  // const size = roomData[0].size;
  // const price = roomData[0].price;
  // const extras = roomData[0].extras;
  // const breakfast = roomData[0].breakfast;
  // const pets = roomData[0].pets;
  // const images = roomData[0].images;
  // const [...defaultBcg] = images;

  useEffect(() => {
    fetch(`http://localhost:3001/rooms/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched room data:', data); // Log the fetched data
        if (Array.isArray(data) && data.length > 0) {
          setRoomData(data[0]);
        } else {
          throw new Error('Invalid data format or empty response');
        }
      })
      .catch((error) => {
        console.error('Error fetching room data:', error);
        // Handle the error gracefully, e.g., display an error message
      });
  }, [id]);

  
  // Function to handle booking
  const navigate = useNavigate();
  const handleBookNow = () => {
    if (user) {
      // If user is logged in, proceed with booking
      navigate(`/booknow/${id}`);
    } else {
          // If user is not logged in, store intended URL in session storage and redirect to login page
    const intendedUrl = `/booknow/${id}`;
    sessionStorage.setItem("intendedUrl", intendedUrl);
    console.log("Intended URL stored:", intendedUrl); // Add this line
    navigate("/signin");

    }
  };
  
  useEffect(() => {
    // If user is logged in and intended URL is stored in session storage, redirect to intended URL
    if (user && sessionStorage.getItem("intendedUrl")) {
      const intendedUrl = sessionStorage.getItem("intendedUrl");
      sessionStorage.removeItem("intendedUrl");
      console.log("Navigating to intended URL:", intendedUrl);
      navigate(intendedUrl);
    }
  }, [user]);
  


  const BASE_IMAGE_URL = 'http://localhost:3001/uploads/';

  return (
    <>
      {roomData && Object.keys(roomData).length > 0 ? (
        <>
          <StyledHero img={roomData.imageUrl3}>
            <Banner title={`${roomData.name} room`}>
              <Link to="/rooms" className="btn btn-primary">
                Back To Rooms
              </Link>
            </Banner>
          </StyledHero>

          {/* {roomData ? (
        <> */}
          <section className="single-room container">
            <div className="row">
              {/* {roomData.map((item, index) => { */}
                {/* return ( */}
                  <div className="col-md-4 col-12 mx-auto" >
                    <div className="card border-0 shadow-lg">
                      {/* <img
                        key={index}
                        src={item}
                        alt={roomData.name}
                        className="img-fluid"
                      /> */}
                      <img src={`${BASE_IMAGE_URL}${roomData.image1}`} alt={roomData.name} className="img-fluid" />
                      <img src={`${BASE_IMAGE_URL}${roomData.image2}`} alt={roomData.name} className="img-fluid" />
                      <img src={`${BASE_IMAGE_URL}${roomData.image3}`} alt={roomData.name} className="img-fluid" />
                      <img src={`${BASE_IMAGE_URL}${roomData.image4}`} alt={roomData.name} className="img-fluid" />

                    </div>
                  </div>
                {/* );
              })} */}
            </div>
            <div className="single-room-info">
              <article className="desc">
                <h3>Details</h3>
                <p>{roomData.description}</p>
              </article>
              <article className="info">
                <h3>Info</h3>
                <h6>price : Rs{roomData.price}</h6>
                <h6>size : {roomData.size} </h6>
                <h6>
                  max capacity :{" "}
                  {roomData.capacity > 1 ? `${roomData.capacity} people` : `${roomData.capacity} person`}
                </h6>
                {/* <h6>{pets ? "pets allowed" : "no pets allowed"}</h6> */}
                <h6>{roomData.breakfast && "free breakfast included"}</h6>
              </article>
            </div>
          </section>
          <section className="room-extras">
            {/* <h3>Extras</h3>
            <ul className="extras">
              {extras.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul> */}
            <div className="p-4 clearfix">
              <div className="row">
                <div className="col-md-3 col-12 ml-auto">
                  {/* <Link
                    to={`/booknow/${id}`}
                    className="btn btn-outline-primary btn-block btn-lg float-right "
                  >
                    Book Now
                  </Link> */}
                  
                  <button
              onClick={handleBookNow} // Call the handleBookNow function on button click
              className="btn btn-outline-primary btn-block btn-lg float-right"
            >
              Book Now
            </button>

                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
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
      )}
    </>
  );
};

export default SingleRooms; 

