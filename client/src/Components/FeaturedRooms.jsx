// import React from "react";
// import { useSelector } from "react-redux";
// import Loading from "./Loading";
// import Room from "./Room";
// import Title from "./Title";

// const FeaturedRooms = () => {
//   const state = useSelector((state) => state);

//   return (
//     <section className="featured-rooms container">
//       <Title title="Featured Rooms" />
//       <div className="row">
//         {state.length > 0 ? (
//           state[0].featuredRooms.map((room) => (
//             <Room key={room.id} room={room} />
//           ))
//         ) : (
//           <Loading />
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedRooms;



import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

const FeaturedRooms = () => {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example filter parameters (you can adjust these based on your UI or user input)
    const filters = {
      type: "single",
      capacity: 2,
      price: 100,
      minSize: 20,
      maxSize: 30,
      breakfast: true,
      pets: false
    };
  
    // Construct URL with query parameters based on filter object
    const queryParams = new URLSearchParams(filters).toString();
    // const url = `http://localhost:3001/filteredRooms?${queryParams}`;
    const url = 'http://localhost:3001/featuredRooms'
    // Fetch filtered rooms from the backend API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Rooms:", data); // Log fetched data

        setFilteredRooms(data); // Set the fetched filtered rooms
        setLoading(false); // Set loading state to false once data is fetched
      })
      .catch((error) => console.error("Error fetching filtered rooms:", error));
  }, []);

  return (
    <section className="featured-rooms container">
      <Title title="Featured Rooms" />
      <div className="row">
        {loading ? (
          <Loading />
        ) : (
          filteredRooms.map((room) => (
            <Room key={room.id} room={room} />
          ))
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
