// import React from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Banner from "./Banner";
// import StyledHero from "../Components/StyledHero";
// import { ref, remove } from "firebase/database";
// import { db } from "../firebase";
// import { useState, useEffect } from "react";

// const SingleRooms = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const state = useSelector((state) => state);
//   const [roomData, setRoomData] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/rooms/${slug}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.length > 0) {
//           setRoomData(data[0]);
//         }
//       })
//       .catch((error) => console.error("Error fetching room data:", error));
//   }, [slug]);

//   const deleteRoom = () => {
//     remove(ref(db, `/hotels/${slug}`)).then(() => {
//       alert("Room deleted Succesfully!");
//       navigate("/rooms");
//     });
//   };

//   return (
//     <>  
//       {/* {roomData.length > 0 ? ( */}
//       {roomData && Object.keys(roomData).length > 0 ? (

//         <>
//           {/* <StyledHero img={defaultBcg[0]}>
//             <Banner title={`${name} room`}>
//               <Link to="/" className="btn btn-primary">
//                 Back To Rooms
//               </Link>
//             </Banner>
//           </StyledHero> */}
//           <StyledHero img={roomData.images[0]}>
//             <Banner title={`${roomData.name} room`}>
//               <Link to="/" className="btn btn-primary">
//                 Back To Rooms
//               </Link>
//             </Banner>
//           </StyledHero>

//           <section className="single-room container">
//             <div className="row">
//               {roomData.map((item, index) => {
//                 return (
//                   <div className="col-md-4 col-12 mx-auto" key={index}>
//                     <div className="card border-0 shadow-lg">
//                       <img
//                         key={index}
//                         src={item}
//                         alt={roomData.name}
//                         className="img-fluid"
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="single-room-info">
//               <article className="desc">
//                 <h3>Details</h3>
//                 <p>{roomData.description}</p>
//               </article>
//               <article className="info">
//                 <h3>Info</h3>
//                 <h6>price : Rs{roomData.price}</h6>
//                 <h6>size : {roomData.size} SQFT</h6>
//                 <h6>
//                   max capacity :{" "}
//                   {roomData.capacity > 1 ? `${roomData.capacity} people` : `${roomData.capacity} person`}
//                 </h6>
//                 {/* <h6>{pets ? "pets allowed" : "no pets allowed"}</h6> */}
//                 <h6>{roomData.breakfast && "free breakfast included"}</h6>
//               </article>
//             </div>
//           </section>
//           <section className="room-extras">
//             {/* <h3>Extras</h3>
//             <ul className="extras">
//               {extras.map((item, index) => {
//                 return <li key={index}>{item}</li>;
//               })}
//             </ul> */}
//             <div className="p-4 clearfix">
//               <div className="row">
//                 <div className="col-md-6 col-12 ml-auto">
//                   <button
//                     className="btn btn-outline-danger btn-block btn-lg float-right "
//                     onClick={deleteRoom}
//                   >
//                     Delete Room.
//                   </button>
//                 </div>
//                 <div className="col-md-6 col-12 ml-auto">
//                   <Link
//                     to={`/update-room/${slug}`}
//                     className="btn btn-outline-primary btn-block btn-lg float-right "
//                   >
//                     Update Room.
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </>
//       ) : (
//         <div className="container roomerror">
//           <div className="row my-5">
//             <div className="col-md-6 col-12 mx-auto">
//               <div className="card shadow-lg border-0 p-4 error">
//                 <h1 className="text-center display-4">SORRY</h1>
//                 <h3>No such room could be found...</h3>
//                 <Link to="/rooms" className="btn btn-warning mt-4 ">
//                   Back to Rooms
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SingleRooms;



import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Banner from "./Banner";
import StyledHero from "../Components/StyledHero";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";
import axios from 'axios';
const SingleRooms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const state = useSelector((state) => state);
  const [roomData, setRoomData] = useState(null);

  // useEffect(() => {
  //   fetch(`http://localhost:3001/rooms/${id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('Room data:', data); // Log the data received from the API
  //       if (Array.isArray(data) && data.length > 0) {
  //         setRoomData(data[0]);
  //       } else {
  //         throw new Error('Invalid data format or empty response');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching room data:', error);
  //       // Handle the error gracefully, e.g., display an error message
  //     });
  // }, [id]);


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

  //   // Define a base URL for your images (adjust this URL to match your server configuration)
  const BASE_IMAGE_URL = 'http://localhost:3001/uploads/';

  // // Assuming roomData contains the fetched data including image filenames
  // // Construct the full URL for each image using the base URL
  // const imageUrl1 = `${BASE_IMAGE_URL}${roomData.image1}`;
  // const imageUrl2 = `${BASE_IMAGE_URL}${roomData.image2}`;
  // const imageUrl3 = `${BASE_IMAGE_URL}${roomData.image3}`;
  // const imageUrl4 = `${BASE_IMAGE_URL}${roomData.image4}`;



  // const deleteRoom = () => {
  //   remove(ref(db, `/hotels/${id}`)).then(() => {
  //     alert("Room deleted Succesfully!");
  //     navigate("/rooms");
  //   });
  // };

  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/rooms/${id}`);
      console.log(response.data); // Log the response from the server
      alert("Room deleted successfully!");
      navigate("/rooms");
    } catch (error) {
      console.error('Error deleting room:', error);
      alert("Error deleting room");
    }
  };
  

  return (
    <>
      {roomData && Object.keys(roomData).length > 0 ? (
        <>
          <StyledHero img={roomData.imageUrl3}>
            <Banner title={`${roomData.name} room`}>
              <Link to="/" className="btn btn-primary">
                Back To Rooms
              </Link>
            </Banner>
          </StyledHero>

          <section className="single-room container">
            <div className="row">
              <div className="col-md-4 col-12 mx-auto">
                <div className="card border-0 shadow-lg">
                  {/* <img
                    src={roomData.image3}
                    alt={roomData.name}
                    className="img-fluid"
                  /> */}
                  <img src={`${BASE_IMAGE_URL}${roomData.image1}`} alt={roomData.name} className="img-fluid" />
                  <img src={`${BASE_IMAGE_URL}${roomData.image2}`} alt={roomData.name} className="img-fluid" />
                  <img src={`${BASE_IMAGE_URL}${roomData.image3}`} alt={roomData.name} className="img-fluid" />
                  <img src={`${BASE_IMAGE_URL}${roomData.image4}`} alt={roomData.name} className="img-fluid" />

                  {/* <img src={imageUrl1} alt={roomData.name} className="img-fluid" />
                      <img src={imageUrl2} alt={roomData.name} className="img-fluid" />
                      <img src={imageUrl4} alt={roomData.name} className="img-fluid" /> */}

                </div>
              </div>
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
            <div className="p-4 clearfix">
              <div className="row">
                <div className="col-md-6 col-12 ml-auto">
                  <button
                    className="btn btn-outline-danger btn-block btn-lg float-right "
                    // onClick={deleteRoom}
                    onClick={() => deleteRoom(id)} // Pass roomId to deleteRoom

                  >
                    Delete Room.
                  </button>
                </div>
                <div className="col-md-6 col-12 ml-auto">
                  <Link
                    to={`/update-room/${id}`}
                    className="btn btn-outline-primary btn-block btn-lg float-right "
                  >
                    Update Room.
                  </Link>
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
