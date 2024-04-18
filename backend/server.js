const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
const moment = require('moment');

const app = express();
const port = 3001;

//! Enable CORS for all requests
const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//! Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Avani",
});

//! Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

//! Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//! Route to handle user registration
// app.post("/signup", (req, res) => {
//   const { email, password, name, number, id } = req.body;

//   // Implement database query to store user data in MySQL database
//   // Example: Insert user data into 'users' table
//   db.query(
//     "INSERT INTO users (email, password, name, number, id) VALUES (?, ?, ?, ?, ?)",
//     [email, password, name, number, id],
//     (err, result) => {
//       if (err) {
//         console.error("Error registering user:", err);
//         res.status(500).send("Error registering user");
//       } else {
//         console.log("User registered successfully");
//         res.status(200).send("User registered successfully");
//       }
//     }
//   );
// });

//! Route to fetch all users data for admin
app.get("/users", (req, res) => {
  // Query to fetch users from the database
  const sql = "SELECT * FROM users";

  // Execute the query
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    } else {
      res.json(result); // Send the users data back as JSON response
    }
  });
});

//! Route to handle user registration
// app.post("/signup", (req, res) => {
//   const { email, password, name, number, id, is_admin } = req.body;

//   // Create 'users' table if it does not exist
//   db.query(
//     `CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       name VARCHAR(255) NOT NULL,
//       number VARCHAR(20) NOT NULL,
//       is_admin BOOLEAN NOT NULL DEFAULT FALSE
//     )`,
//     (err, result) => {
//       if (err) {
//         console.error("Error creating users table:", err);
//         res.status(500).send("Error creating users table");
//         return;
//       }

//       // Insert user data into 'users' table
//       db.query(
//         "INSERT INTO users (email, password, name, number, id, is_admin) VALUES (?, ?, ?, ?, ?, ?)",
//         [email, password, name, number, id, is_admin],
//         (err, result) => {
//           if (err) {
//             console.error("Error registering user:", err);
//             res.status(500).send("Error registering user");
//           } else {
//             console.log("User registered successfully");
//             res.status(200).send("User registered successfully");
//           }
//         }
//       );
//     }
//   );
// });

const bcrypt = require('bcrypt');

// Function to insert default admin credentials
// const insertDefaultAdminCredentials = () => {
//   // Hash the default admin password
//   bcrypt.hash('adminadmin', 10, (err, hashedPassword) => {
//     if (err) {
//       console.error("Error hashing default admin password:", err);
//       return;
//     }

//     // Insert default admin credentials into 'users' table
//     db.query(
//       "INSERT INTO users (email, password, name, is_admin) VALUES (?, ?, ?, ?)",
//       ['admin@gmail.com', hashedPassword, 'Admin', true],
//       (err, result) => {
//         if (err) {
//           console.error("Error inserting default admin credentials:", err);
//         } else {
//           console.log("Default admin credentials inserted successfully");
//         }
//       }
//     );
//   });
// };

// Create 'users' table if it does not exist
db.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    number VARCHAR(20) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
  )`,
  (err, result) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }

    // Insert default admin credentials after creating the table
    // insertDefaultAdminCredentials();
  }
);

app.post("/signup", (req, res) => {
  const { email, password, name, number, id, is_admin } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).send("Error registering user");
      return;
    }

    // Insert user data into 'users' table
    db.query(
      "INSERT INTO users (email, password, name, number, is_admin) VALUES (?, ?, ?, ?, ?)",
      [email, hashedPassword, name, number, is_admin || false], // Set is_admin to false if not provided
      (err, result) => {
        if (err) {
          console.error("Error registering user:", err);
          res.status(500).send("Error registering user");
        } else {
          console.log("User registered successfully");
          res.status(200).send("User registered successfully");
        }
      }
    );
  });
});



// //! Route to handle user login
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // Implement logic to validate user credentials in the database
//   db.query(
//     "SELECT * FROM users WHERE email = ? AND password = ?",
//     [email, password],
//     (err, results) => {
//       if (err) {
//         console.error("Error logging in:", err);
//         res.status(500).send("Error logging in");
//         return;
//       }

//       if (results.length > 0) {
//         // User authenticated successfully
//         res.status(200).json({ message: "Login successful", user: results[0] });
//       } else {
//         // Invalid credentials
//         res.status(401).send("Invalid email or password");
//       }
//     }
//   );
// });

//! Route to handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user is an admin
  if (email === "admin@gmail.com" && password === "adminadmin") {
    // Return a success response indicating admin login
    res.status(200).json({ isAdmin: true, message: "Admin logged in successfully" });
  } else {
    // Check for regular user credentials
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (err, results) => {
        if (err) {
          console.error("Error logging in:", err);
          res.status(500).send("Error logging in");
          return;
        }

        if (results.length > 0) {
          // Regular user authenticated successfully
          res.status(200).json({ isAdmin: false, message: "Login successful", user: results[0] });
        } else {
          // Invalid credentials
          res.status(401).send("Invalid email or password");
        }
      }
    );
  }
});


//! Logout endpoint
app.post('/logout', (req, res) => {
  // Clear user session or JWT token
  res.status(200).json({ message: 'Logout successful' });
});

//! Multer configuration
app.use('/uploads', express.static('uploads'));

const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

//! Add room route
// app.post("/addRoom", (req, res) => {
//   const {
//     name,
//     type,
//     price,
//     size,
//     capacity,
//     breakfast,
//     description,
//     image1,
//     image2,
//     image3,
//     image4,
//   } = req.body;

//   // const image1 = req.files["image1"][0].filename;
//   // const image2 = req.files["image2"][0].filename;
//   // const image3 = req.files["image3"][0].filename;
//   // const image4 = req.files["image4"][0].filename;

//   const sql = `INSERT INTO rooms (name, type, price, size, capacity, breakfast, description, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//   const values = [
//     name,
//     type,
//     price,
//     size,
//     capacity,
//     breakfast,
//     description,
//     image1,
//     image2,
//     image3,
//     image4,
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding room:", err);
//       res.status(500).send("Error adding room");
//     } else {
//       console.log("Room added successfully");
//       res.status(200).send("Room added successfully");
//     }
//   });
// });

//! Add room route with file uploads
// app.post("/addRoom", upload.fields([
//   { name: 'image1', maxCount: 1 },
//   { name: 'image2', maxCount: 1 },
//   { name: 'image3', maxCount: 1 },
//   { name: 'image4', maxCount: 1 }
// ]), (req, res) => {
//   const {
//     name,
//     type,
//     price,
//     size,
//     capacity,
//     breakfast,
//     description,
//   } = req.body;

//   const images = {
//     image1: req.files["image1"] ? req.files["image1"][0].filename : null,
//     image2: req.files["image2"] ? req.files["image2"][0].filename : null,
//     image3: req.files["image3"] ? req.files["image3"][0].filename : null,
//     image4: req.files["image4"] ? req.files["image4"][0].filename : null,
//   };

//   const sql = `INSERT INTO rooms (name, type, price, size, capacity, breakfast, description, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//   const values = [
//     name,
//     type,
//     price,
//     size,
//     capacity,
//     breakfast,
//     description,
//     images.image1,
//     images.image2,
//     images.image3,
//     images.image4,
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error adding room:", err);
//       res.status(500).send("Error adding room");
//     } else {
//       console.log("Room added successfully");
//       res.status(200).send("Room added successfully");
//     }
//   });
// });


//! Add room route with file uploads
app.post("/addRoom", upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), (req, res) => {
  const {
    name,
    type,
    price,
    size,
    capacity,
    breakfast,
    description,
  } = req.body;

  const images = {
    image1: req.files["image1"] ? req.files["image1"][0].filename : null,
    image2: req.files["image2"] ? req.files["image2"][0].filename : null,
    image3: req.files["image3"] ? req.files["image3"][0].filename : null,
    image4: req.files["image4"] ? req.files["image4"][0].filename : null,
  };

  // Check if 'rooms' table exists
  db.query("SHOW TABLES LIKE 'rooms'", (err, result) => {
    if (err) {
      console.error("Error checking 'rooms' table:", err);
      res.status(500).send("Error adding room");
      return;
    }

    // If 'rooms' table doesn't exist, create it
    if (result.length === 0) {
      db.query(`CREATE TABLE rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        size INT NOT NULL,
        capacity INT NOT NULL,
        breakfast BOOLEAN NOT NULL,
        description TEXT,
        image1 VARCHAR(255),
        image2 VARCHAR(255),
        image3 VARCHAR(255),
        image4 VARCHAR(255)
      )`, (err, result) => {
        if (err) {
          console.error("Error creating 'rooms' table:", err);
          res.status(500).send("Error adding room");
          return;
        }
        console.log("Created 'rooms' table");
        // Now proceed to insert room
        insertRoom();
      });
    } else {
      // If 'rooms' table exists, directly proceed to insert room
      insertRoom();
    }
  });

  // Function to insert room into the database
  function insertRoom() {
    const sql = `INSERT INTO rooms (name, type, price, size, capacity, breakfast, description, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      name,
      type,
      price,
      size,
      capacity,
      breakfast,
      description,
      images.image1,
      images.image2,
      images.image3,
      images.image4,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error adding room:", err);
        res.status(500).send("Error adding room");
      } else {
        console.log("Room added successfully");
        res.status(200).send("Room added successfully");
      }
    });
  }
});


//!to get room details
app.get("/rooms", (req, res) => {
  const sql = "SELECT * FROM rooms"; // Assuming your table name is 'rooms'
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching rooms:", err);
      res.status(500).send("Error fetching rooms");
    } else {
      res.json(result); // Send the result back as JSON response
    }
  });
});

//! API endpoint to fetch room data
app.get("/rooms/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM rooms WHERE id = '${id}'`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
      throw err;
    }
    res.json(result);
  });
});

//! Route to handle file uploads
app.post("/upload", upload.array("images", 4), (req, res) => {
  const files = req.files;
  if (!files) {
    return res.status(400).send("No files were uploaded.");
  }
  // At this point, files have been uploaded and stored in the 'uploads' directory
  // You can now process the files as per your requirements (e.g., save file paths to a database)
  // For demonstration, I'm just sending back a response with the uploaded file names
  const fileNames = files.map(file => file.filename);
  res.send(fileNames);
});

//! Update room route
app.put('/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  const updatedRoom = req.body;

  // Extract the fields to update from the updatedRoom object
  const { name, type, price, size, capacity, breakfast, description, images } = updatedRoom;

  // Construct the SQL query with the SET clause including the fields to update
  const sql = 'UPDATE rooms SET name=?, type=?, price=?, size=?, capacity=?, breakfast=?, description=?, images=? WHERE id = ?';

  // Execute the SQL query with the provided parameters
  db.query(sql, [name, type, price, size, capacity, breakfast, description, JSON.stringify(images), roomId], (error, results) => {
    if (error) {
      console.error('Error updating room:', error);
      res.status(500).send('Error updating room');
      return;
    }
    console.log('Room updated successfully');
    res.status(200).send('Room updated successfully');
  });
});

//! Add booking route
app.post("/bookings", (req, res) => {
  const {
    fullNmae,
    phoneNumber,
    cnic,
    address,
    email,
    persons,
    startDate,
    endDate,
    roomId, // assuming you'll also send the roomId from the client
    user, // assuming you'll send the user details from the client
    totalPrice, // Add totalPrice sent from the client
    daysLeft,
  } = req.body;

  const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
  const formattedEndDate = moment(endDate).format("YYYY-MM-DD");

  // Assuming 'bookings' table schema has fields like 'full_name', 'phone', 'cnic', 'address', 'email', 'persons', 'start_date', 'end_date', 'room_id', 'user_id', 'status', 'created_at', 'updated_at'

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255),
      phone VARCHAR(255),
      cnic VARCHAR(255),
      address VARCHAR(255),
      email VARCHAR(255),
      persons INT,
      start_date DATE,
      end_date DATE,
      room_id INT,
      user_id INT,
      total_price DECIMAL(10, 2),
      days_left INT,
      status VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  const insertBookingSql = `
    INSERT INTO bookings (full_name, phone, cnic, address, email, persons, start_date, end_date, room_id, user_id, total_price, days_left, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [
    fullNmae,
    phoneNumber,
    cnic,
    address,
    email,
    persons,
    formattedStartDate,
    formattedEndDate,
    roomId,
    user.id,
    totalPrice, // Add totalPrice sent from the client
    daysLeft,
    "Pending"
  ];

  db.query(createTableSql, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      res.status(500).send("Error adding booking");
      return;
    }

    db.query(insertBookingSql, values, (err, result) => {
      if (err) {
        console.error("Error adding booking:", err);
        res.status(500).send("Error adding booking");
      } else {
        console.log("Booking added successfully");
        res.status(200).send("Booking added successfully");
      }
    });
  });
});

//! Route to fetch all bookings
// app.get("/bookings", (req, res) => {
//   // Query to fetch all bookings from the 'bookings' table
//   const sql = "SELECT * FROM bookings";

//   // Execute the query
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error fetching bookings:", err);
//       res.status(500).send("Error fetching bookings");
//     } else {
//       res.json(result); // Send the bookings data back as JSON response
//     }
//   });
// });

//! Route to fetch all bookings
app.get("/bookings", (req, res) => {
  // Query to fetch all bookings from the 'bookings' table along with associated room details
  const sql = "SELECT bookings.*, rooms.name AS room_name, rooms.type AS room_type FROM bookings LEFT JOIN rooms ON bookings.room_id = rooms.id";

  // Execute the query
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      res.status(500).send("Error fetching bookings");
    } else {
      res.json(result); // Send the bookings data back as JSON response
    }
  });
});


//! Endpoint to update a booking by admin
app.put("/updateBooking/:id", (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  // Update the booking status in the database
  db.query(
    "UPDATE bookings SET status = ? WHERE id = ?",
    [status, bookingId],
    (err, result) => {
      if (err) {
        console.error("Error updating booking:", err);
        res.status(500).send("Error updating booking");
      } else {
        console.log("Booking updated successfully");
        res.status(200).send("Booking updated successfully");
      }
    }
  );
});

//! Endpoint to update room availability when a booking is rejected by admin
//! Endpoint to update room availability when a booking is rejected by admin
app.put("/check-availability/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;

  // Query to fetch the booking details
  const getBookingSql = "SELECT * FROM bookings WHERE id = ?";
  
  // Execute the query to fetch the booking details
  db.query(getBookingSql, [bookingId], (err, bookingResult) => {
    if (err) {
      console.error("Error fetching booking details:", err);
      res.status(500).send("Error updating date availability");
      return;
    }

    if (bookingResult.length === 0) {
      console.error("Booking not found");
      res.status(404).send("Booking not found");
      return;
    }

    const { roomId, startDate, endDate } = bookingResult[0];

    // Query to update date availability for the rejected booking in the rooms table
    const updateAvailabilitySql = `
      UPDATE rooms
      SET is_available = 1
      WHERE id = ? AND NOT (? >= (SELECT start_date FROM bookings WHERE id = ?) OR ? <= (SELECT end_date FROM bookings WHERE id = ?))
    `;

    // Execute the query to update date availability
    db.query(updateAvailabilitySql, [roomId, endDate, bookingId, startDate, bookingId], (err, result) => {
      if (err) {
        console.error("Error updating date availability:", err);
        res.status(500).send("Error updating date availability");
        return;
      }
      
      console.log("Date availability updated successfully");
      res.status(200).send("Date availability updated successfully");
    });
  });
});


//! Endpoint to get bookings for a specific user
app.get('/users/:userId/bookings', (req, res) => {
  const userId = req.params.userId;
  const sql = `
  SELECT bookings.*, rooms.type AS room_type, rooms.capacity, rooms.price
FROM bookings
JOIN rooms ON bookings.room_id = rooms.id
WHERE bookings.user_id = ?

  `;
  db.query(sql, userId, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    } else {
      res.json(results);
    }
  });
});


//! Route to delete a user booking
app.delete('/users/:userId/bookings/:bookingId', (req, res) => {
  const userId = req.params.userId;
  const bookingId = req.params.bookingId;

  // Query to delete a booking for a specific user
  const sql = `DELETE FROM bookings WHERE user_id = ? AND id = ?`;

  // Execute the query
  db.query(sql, [userId, bookingId], (err, result) => {
    if (err) {
      console.error('Error deleting user booking:', err);
      res.status(500).json({ error: 'Error deleting user booking' });
    } else {
      res.json({ message: 'Booking deleted successfully' });
    }
  });
});

//! Route to check date availability
app.get("/check-availability", (req, res) => {
  const { roomId, startDate, endDate } = req.query;

  // Convert startDate and endDate strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Query to check if the selected date range is available for the specified room
  const sql = `
    SELECT * FROM bookings
    WHERE room_id = ? AND (
      (start_date BETWEEN ? AND ?)
      OR (end_date BETWEEN ? AND ?)
      OR (? BETWEEN start_date AND end_date)
    )
  `;

  // Execute the query with the provided parameters
  db.query(sql, [roomId, start, end, start, end, start], (err, result) => {
    if (err) {
      console.error("Error checking availability:", err);
      res.status(500).send("Error checking availability");
      return;
    }

    // If there are no overlapping bookings, the room is available
    const isAvailable = result.length === 0;
    res.json({ available: isAvailable });
  });
});

//! DELETE route to delete a room
app.delete('/rooms/:id', (req, res) => {
  const roomId = req.params.id;

  // Execute the SQL query to delete the room with the specified ID
  const sql = 'DELETE FROM rooms WHERE id = ?';
  db.query(sql, [roomId], (error, results) => {
    if (error) {
      console.error('Error deleting room:', error);
      res.status(500).send('Error deleting room');
    } else {
      console.log('Room deleted successfully');
      res.status(200).send('Room deleted successfully');
    }
  });
});

//! GET route to fetch filtered room details
// app.get("/filteredRooms", (req, res) => {
//   const { type, capacity, price, minSize, maxSize, breakfast, pets } = req.query;

//   // Construct the SQL query based on filter parameters
//   let sql = "SELECT * FROM rooms WHERE 1=1"; // Start with a base query

//   // Add filters based on the parameters provided
//   if (type && type !== "all") {
//     sql += ` AND type = '${type}'`;
//   }
//   if (capacity) {
//     sql += ` AND capacity >= ${capacity}`;
//   }
//   if (price) {
//     sql += ` AND price <= ${price}`;
//   }


//   // Execute the constructed SQL query
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error fetching filtered rooms:", err);
//       res.status(500).send("Error fetching filtered rooms");
//     } else {
//       res.json(result); // Send the result back as JSON response
//     }
//   });
// });

//! GET route to fetch featured room details
app.get("/featuredRooms", (req, res) => {
  const sql = "SELECT * FROM rooms ORDER BY price DESC LIMIT 3"; // Example: Selecting rooms with higher prices as featured

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching featured rooms:", err);
      res.status(500).send("Error fetching featured rooms");
    } else {
      res.json(result); // Send the result back as JSON response
    }
  });
});

//! Add trekking route with file uploads
app.post("/addTrekking", upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), (req, res) => {
  const {
    name,
    type,
    price,
    size,
    capacity,
    breakfast,
    description,
    map,
  } = req.body;

  const images = {
    image1: req.files["image1"] ? req.files["image1"][0].filename : null,
    image2: req.files["image2"] ? req.files["image2"][0].filename : null,
    image3: req.files["image3"] ? req.files["image3"][0].filename : null,
    image4: req.files["image4"] ? req.files["image4"][0].filename : null,
  };

  // Check if 'rooms' table exists
  db.query("SHOW TABLES LIKE 'trekking'", (err, result) => {
    if (err) {
      console.error("Error checking 'trekking' table:", err);
      res.status(500).send("Error adding trekking");
      return;
    }

    // If 'rooms' table doesn't exist, create it
    if (result.length === 0) {
      db.query(`CREATE TABLE trekking (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        size INT NOT NULL,
        capacity INT NOT NULL,
        breakfast BOOLEAN NOT NULL,
        description TEXT,
        map VARCHAR(255) NOT NULL,
        image1 VARCHAR(255),
        image2 VARCHAR(255),
        image3 VARCHAR(255),
        image4 VARCHAR(255)
      )`, (err, result) => {
        if (err) {
          console.error("Error creating 'trekking' table:", err);
          res.status(500).send("Error adding trekking");
          return;
        }
        console.log("Created 'trekking' table");
        // Now proceed to insert room
        insertRoom();
      });
    } else {
      // If 'rooms' table exists, directly proceed to insert room
      insertRoom();
    }
  });

  // Function to insert room into the database
  function insertRoom() {
    const sql = `INSERT INTO trekking (name, type, price, size, capacity, breakfast, description, map, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      name,
      type,
      price,
      size,
      capacity,
      breakfast,
      description,
      map,
      images.image1,
      images.image2,
      images.image3,
      images.image4,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error adding trekking:", err);
        res.status(500).send("Error adding trekking");
      } else {
        console.log("Trekking added successfully");
        res.status(200).send("Trekking added successfully");
      }
    });
  }
});


//!to get room details
app.get("/trekkings", (req, res) => {
  const sql = "SELECT * FROM trekking"; // Assuming your table name is 'rooms'
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching trekkings:", err);
      res.status(500).send("Error fetching trekkings");
    } else {
      res.json(result); // Send the result back as JSON response
    }
  });
});

//! API endpoint to fetch room data
app.get("/trekkings/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM trekking WHERE id = '${id}'`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
      throw err;
    }
    res.json(result);
  });
});


//!server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
