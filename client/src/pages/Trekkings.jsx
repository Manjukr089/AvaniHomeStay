import React from "react";
import Hero from "../Components/Hero";
import Banner from "../Components/Banner";
import { Link } from "react-router-dom";
import RoomsContainer from "../Components/RoomsContainer";
const Trekkings = () => {
  return (
    <div>
      <Hero hero="trekkingHero"></Hero>
      <Banner title="Available Trekkings" subtitle="Best nearby Trekking spots ">
        <Link to="/" className="btn btn-success">
          RETURN HOME
        </Link>
      </Banner>
      <RoomsContainer />
    </div>
  );
};

export default Trekkings;
