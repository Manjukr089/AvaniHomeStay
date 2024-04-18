  import React from "react";
  import { NavLink, useNavigate } from "react-router-dom";
  import { FaAlignRight } from "react-icons/fa";
  import { NavDropdown } from 'react-bootstrap';

  import { useUserAuth } from "../contexts/UserAuthContext";
  import logo from '../images/logo.jpeg';
  const Navbar = () => {
    const { user, logOut } = useUserAuth();
    const navigate = useNavigate();

    async function handleLogout() {
      try {
        await logOut();
        navigate("/signin");
      } catch {
        console.log("can't logut");
      }
    }
    return (
      <>
        {/* <nav className="navbar navbar-expand-sm navbar- bg-light py-2 fixed-top scrolled" style={{backgroundColor:"rgb(105, 206, 105)"}}> */}
        <nav className="navbar navbar-expand-sm navbar-light bg-light py-2 fixed-top scrolled" style={{backgroundImage: "linear-gradient(to left, #98FB98, #00BFFF)"}}>

          <div className="container-fluid ">
            <span
              className="navbar-brand font-weight-bolder"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              {/* Hotel. */}
              <img src={logo} alt="" height={50} width={150} />
              {/* <img src="../images/logo.jpeg" alt="" height={50} width={150} /> */}
            </span>
            <a
              href="void(0)"
              className="navbar-toggler border-0"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span>
                <FaAlignRight className="nav-icon" />
              </span>
            </a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                  //   activeClassName="active_class"
                    exact="true"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink
                    className="nav-link"
                  //   activeClassName="active_class"
                    exact="true"
                    to="/rooms"
                  >
                    Rooms
                  </NavLink>
                </li> */}
                <li className="nav-item dropdown">
              <NavDropdown className="text-primary" title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item href="/rooms">Rooms</NavDropdown.Item>
                <NavDropdown.Item href="/trekkings">Trekking</NavDropdown.Item>
                <NavDropdown.Item href="/travels">Travels</NavDropdown.Item>
                <NavDropdown.Divider />
                {/* <NavDropdown.Item href="#action/3.4">All Rooms</NavDropdown.Item> */}
              </NavDropdown>
            </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                  //   activeClassName="active_class"
                    exact="true"
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                  //   activeClassName="active_class"
                    exact="true"
                    to="/gallery"
                  >
                    Gallery
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                  //   activeClassName="active_class"
                    exact="true"
                    to="/contact-us"
                  >
                    Contact
                  </NavLink>
                </li>

                {user ? (
                  <>
                    <li>
                      <NavLink
                        className="nav-link"
                      //   activeClassName="active_class"
                        exact="true"
                        to="/bookings"
                      >
                        Bookings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="nav-link"
                      //   activeClassName="active_class"
                        exact="true"
                        to="/signup"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-primary"
                          onClick={handleLogout}
                        >
                          Log Out
                        </button>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        className="nav-link"
                      //   activeClassName="active_class"
                        exact="true"
                        to="/signin"
                      >
                        <button type="button" className="btn btn-outline-danger btn-primary">
                          Log in
                        </button>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className="nav-link"
                      //   activeClassName="active_class"
                        exact="true"
                        to="/signup"
                      >
                        <button type="button" className="btn btn-outline-danger btn-primary">
                          Sign up
                        </button>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  };
  export default Navbar;
