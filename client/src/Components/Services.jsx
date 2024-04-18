import React from 'react'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer, FaHome } from "react-icons/fa";
import Title from './Title';
import {Link, useNavigate} from "react-router-dom";
const Services = () => {
  const navigate = useNavigate()
    const service = {
      services: [
        {
          // icon: <FaCocktail style={{color:'rgb(105, 206, 105)'}}/>,
          icon : <FaHome style={{ color: 'rgb(105, 206, 105)' }} />,

          title: "Rooms",
          info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
          navigate: "/rooms"
          // info: "We provide a rooms for staying",
        },
        {
          icon: <FaHiking style={{color:'rgb(105, 206, 105)'}}/>,
          id:1,
          title: "Endless Trekking",
          info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
          navigate: "/trekkings"

        },
        {
          icon: <FaShuttleVan style={{color:'rgb(105, 206, 105)'}} />,
          title: "Travels",
          info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
          navigate: "/travels"

        },
        // {
        //   icon: <FaBeer style={{color:'rgb(105, 206, 105)'}} />,
        //   title: "Unlimited Beer",
        //   info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
        // },
      ],
    };
    return (
      <div className="container-fluid services">
        <Title title="Services" />
        <div className="row">
          {service.services.map((item, index) => {
            return (
              <div
                className="col-md-4 col-lg-3 col-12 mx-auto my-3"
                key={index}
              >
                <div className="card shadow-lg border-0 p-4">
                  <article className="service">
                    <span>{item.icon}</span>
                    {/* <h6>{item.title}</h6> */}
                    <Link to= {item.navigate}><h6>{item.title}</h6></Link>
                    <p>{item.info}</p>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default Services
