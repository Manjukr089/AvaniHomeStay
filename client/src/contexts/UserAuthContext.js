// import { createContext, useContext, useEffect, useState } from "react";

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";

// import { auth, db } from "../firebase";

// import { child, get, ref, set } from "firebase/database";
// import { uid } from "uid";

// const userAuthContext = createContext();

// export function UserAuthContextProvider({ children }) {
//   const [user, setUser] = useState({});
//   const uuid = uid();

//   function logIn(email, password) {
//     get(child(ref(db), "/users")).then((data) => {
//       const userAuth = Object.values(data.val()).filter(
//         (item) => item.email === email && item.isAdmin === false
//       );
//       if (userAuth[0]) {
//         return signInWithEmailAndPassword(auth, email, password);
//       }
//       alert("Please Sign in with User Account.");
//       // return signInWithEmailAndPassword(auth, email, password);
//     });
//   }

//   function signUp(email, password, name, number, id) {
//     return createUserWithEmailAndPassword(auth, email, password).then(() => {
//       set(ref(db, `users/${uuid}`), {
//         email,
//         name,
//         number,
//         id,
//         isAdmin: false,
//       });
//     });
//   }
//   function logOut() {
//     return signOut(auth);
//   }
//   function googleSignIn() {
//     const googleAuthProvider = new GoogleAuthProvider();
//     return signInWithPopup(auth, googleAuthProvider);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
//       setUser(currentuser);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <userAuthContext.Provider
//       value={{ user, logIn, signUp, logOut, googleSignIn }}
//     >
//       {children}
//     </userAuthContext.Provider>
//   );
// }

// export function useUserAuth() {
//   return useContext(userAuthContext);
// }

import { createContext, useContext, useEffect, useState } from "react";
import { uid } from "uid";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const users = []; // Sample storage for user data
  const uuid = uid(); // Generate unique ID for new users

  // function logIn(email, password) {
  //   // Simulate database fetch
  //   const userAuth = users.find(
  //     (item) => item.email === email && !item.isAdmin
  //   );
  //   if (userAuth) {
  //     // Simulate successful login
  //     setUser(userAuth);
  //   } else {
  //     alert("Please Sign in with User Account.");
  //   }
  // }

  
  function logIn(email, password) {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid email or password');
      }
    })
    .then(data => {
      setUser(data.user);
    })
    .catch(error => {
      alert(error.message);
    });
  }
  

  function signUp(email, password, name, number, id) {
    // Simulate database update
    const newUser = {
      email,
      name,
      number,
      id,
      isAdmin: false,
      uuid,
    };
    users.push(newUser);
    setUser(newUser);
  }

  function logOut() {
    setUser(null);
  }

  // No direct alternative for Google sign-in without Firebase

  useEffect(() => {
    // Simulate session management
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    // Simulate storing user in session
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
