import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"
              
// const firebaseConfig = {
//   apiKey: "AIzaSyDzha_p5FDDTlfpUy2x59R_1uHUP2eILtw",
//   authDomain: "jawanpakhackathon.firebaseapp.com",
//   projectId: "jawanpakhackathon",
//   storageBucket: "jawanpakhackathon.appspot.com",
//   messagingSenderId: "845328112334",
//   appId: "1:845328112334:web:80cb6396f82ad915ea4e9f"
// };


const firebaseConfig = {
  apiKey: "AIzaSyAKtUqRKPJKFS1iP7eb0tHoNuv1XbssUqY",
  authDomain: "avani-3e6dc.firebaseapp.com",
  projectId: "avani-3e6dc",
  storageBucket: "avani-3e6dc.appspot.com",
  messagingSenderId: "912198318425",
  appId: "1:912198318425:web:01c9e9681b437b3d76f448",
  // measurementId: "G-8HCZPSC30J"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getDatabase();
export default app;
