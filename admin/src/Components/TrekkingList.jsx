import React, { useState, useEffect } from "react";
import Room from "./Room";
import notFound from "../images/notfound.svg";
import Trekking from "./Trekking";

export default function TrekkingList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch rooms data from API
    fetch("http://localhost:3001/trekkings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
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
      {!rooms ? (
        <>
          <div className="container my-5">
            <div className="card shadow-lg border-0 p-4">
              <div className="row">
                <div className="col-md-6 col-12 my-auto">
                  <img src={notFound} alt="not found" className="img-fluid" />
                </div>
                <div className="col-md-6 col-12 mx-auto">
                  <div className="empty-search">
                    <h3 className="display-4">
                      Unfortunately no rooms matched your search parameters
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <section className="container" style={{ marginTop: "100px" }}>
          <div className="row my-5">
            {rooms.map((item) => {
              return <Trekking key={item.id} room={item} />;
            })}
          </div>
        </section>
      )}
    </>
  );
}
