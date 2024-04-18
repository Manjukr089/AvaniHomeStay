// import React from "react";
// import { Table } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import Loading from "./Loading";

// const Users = () => {
//   const state = useSelector((state) => state);

//   return (
//     <>
//       {state[1] ? (
//         <Table
//           striped
//           bordered
//           hover
//           size="sm"
//           style={{ marginTop: "80px", width: "80%", margin: "80px auto" }}
//         >
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone No.</th>
//               <th>Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.values(state[1]).map((item) => (
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{item.number}</td>
//                 <td>{item.isAdmin ? "Admin" : "User"}</td>
//               </tr>
//             ))}
            
//           </tbody>
//         </Table>
//       ) : (
//         <Loading message={"Users data loading..."} />
//       )}
//     </>
//   );
// };

// export default Users;


import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Loading from "./Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users data when component mounts
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading message={"Users data loading..."} />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px", width: "80%", margin: "80px auto" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>{user.is_admin ? "Admin" : "User"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Users;
