// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaAlignRight } from "react-icons/fa";
// import { useUserAuth } from "../contexts/UserAuthContext";

// const Navbar = () => {
//   const { user , logOut } = useUserAuth();
//   const navigate = useNavigate();

//   async function handleLogout() {
//     try {
//       await logOut();
//       navigate("/");
//     } catch {
//       console.log("can't logut");
//     }
//   }
//   return (
//     <>
//     {
//       user?
//       <>
//       <nav className="navbar navbar-expand-sm navbar-dark bg-transparent py-2 fixed-top scrolled">
//         <div className="container-fluid ">
//           <span
//             className="navbar-brand font-weight-bolder"
//             style={{ cursor: "pointer" }}
//             onClick={() => navigate("/")}
//           >
//             {/* Hotel Admin. */}
//             <img src="../images/logo.jpeg" alt="" height={50} width={150} />

//           </span>
//           <a
//             href="void(0)"
//             className="navbar-toggler border-0"
//             data-toggle="collapse"
//             data-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span>
//               <FaAlignRight className="nav-icon" />
//             </span>
//           </a>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <NavLink
//                   className="nav-link"
//                   //   activeClassName="active_class"
//                   exact="true"
//                   to="/rooms"
//                 >
//                   Rooms
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   className="nav-link"
//                   //   activeClassName="active_class"
//                   exact="true"
//                   to="/addRoom"
//                 >
//                   Add Room
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   className="nav-link"
//                   //   activeClassName="active_class"
//                   exact="true"
//                   to="/update-room"
//                 >
//                   Update Room
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   className="nav-link"
//                   //   activeClassName="active_class"
//                   exact="true"
//                   to="/users"
//                 >
//                   Users
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   className="nav-link"
//                   //   activeClassName="active_class"
//                   exact="true"
//                   to="/bookings"
//                 >
//                   Bookings
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   className="nav-link"
//                   //   activeClassName="active_class"
//                   exact="true"
//                   to="/login"
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-outline-danger"
//                     onClick={handleLogout}
//                   >
//                     Log Out
//                   </button>
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       </>
//       :
//       <>
//       <nav className="navbar navbar-expand-sm navbar-dark bg-transparent py-2 fixed-top scrolled justify-content-center">
//         <div className="container-fluid " style = {{display : "flex" , justifyContent : "center"}} >
//           <span
//             className="navbar-brand font-weight-bolder"
//             style={{ cursor: "pointer" }}
//           >
//             Avani Home Stay Admin Page
//           </span>
          
        
//         </div>
//       </nav>
//       </>
//     }
      
//     </>
//   );
// };
// export default Navbar;



import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import { useUserAuth } from "../contexts/UserAuthContext";
import logo from '../images/logo.jpeg';

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logOut();
      navigate("/");
    } catch {
      console.log("can't logout");
    }
  }

  return (
    <>
      {/* {user && user.isAdmin && ( // Check if user exists and is an admin */}
        {/* <nav className="navbar navbar-expand-sm navbar-dark bg-transparent py-2 fixed-top scrolled"> */}
        <nav className="navbar navbar-expand-sm navbar-light bg-light py-2 fixed-top scrolled" style={{backgroundImage: "linear-gradient(to left, #98FB98, #00BFFF)"}}>

          <div className="container-fluid ">
            <span
              className="navbar-brand font-weight-bolder"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              {/* Hotel Admin. */}
              <img src={logo} alt="" height={50} width={150} />
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    //   activeClassName="active_class"
                    exact="true"
                    to="/rooms"
                  >
                    Rooms
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    //   activeClassName="active_class"
                    exact="true"
                    to="/trekkings"
                  >
                    Trekkings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    //   activeClassName="active_class"
                    exact="true"
                    to="/addRoom"
                  >
                    Add Room
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    //   activeClassName="active_class"
                    exact="true"
                    to="/addTrekking"
                  >
                    Add Trekking
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    //   activeClassName="active_class"
                    exact="true"
                    to="/update-room"
                  >
                    Update Room
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    //   activeClassName="active_class"
                    exact="true"
                    to="/users"
                  >
                    Users
                  </NavLink>
                </li>
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
                    to="/login"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      {/* )} */}
    </>
  );
};

export default Navbar;
