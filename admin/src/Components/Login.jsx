import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../contexts/UserAuthContext";
import styled from "styled-components";

const Button = styled.button`
  background-color: blue;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border: none;
  font-size: 20px;
  width: 100%;

  &:hover {
    background-color: white;
    color: blue;
    border: 2px solid blue;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn} = useUserAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     await logIn(email, password);
  //     navigate("/rooms");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        if (data.isAdmin) {
          // Redirect to rooms page
          navigate("/rooms");
        } else {
          // Redirect to regular login page
          navigate("/");
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  }; 

  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     const response = await fetch("http://localhost:3001/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       logIn(email, password); // Ensure you pass email and password to logIn
  //     } else {
  //       setError(data.message);
  //     }
  //   } catch (err) {
  //     setError("Invalid email or password.");
  //     console.error("Error logging in:", err); // Log error for debugging
  //   }
  // };

  return (
    <>
      <div className="p-4 box" style={{ width: "50%", margin: "100px auto" }}>
        <h2 className="mb-3 text-center">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
      </div>
    </>
  );
};

export default Login;
