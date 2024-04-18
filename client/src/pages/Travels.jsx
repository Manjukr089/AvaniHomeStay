import React from "react";
import Hero from "../Components/Hero";
import Banner from "../Components/Banner";
import { Link } from "react-router-dom";
import RoomsContainer from "../Components/RoomsContainer";
const Travels = () => {
  return (
    <div>
      <Hero hero="travelsHero"></Hero>
      <Banner title="Available Travels" subtitle="Best nearby places to visit ">
        <Link to="/" className="btn btn-success">
          RETURN HOME
        </Link>
      </Banner>
      <RoomsContainer />
    </div>
  );
};

export default Travels;
