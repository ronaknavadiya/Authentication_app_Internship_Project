import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let storageUser = localStorage.getItem("user");
    storageUser = JSON.parse(storageUser);
    console.log(storageUser);
    if (storageUser != null) {
      navigate("/profilePage");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/registeruser", {
        firstname: fname,
        lastname: lname,
        email: email,
        password: password,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(
        "User has been created sucessfully, now you can edit your detail from profile page"
      );

      navigate("/profilePage");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <h2>Register User</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            name="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            name="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </Form.Group>

        {/* email */}
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group controlId="formBasicEmail">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group> */}

        {/* {photo, name, bio, phone, email and password} */}

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Form>

      <p className="subhead">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </>
  );
};

export default Register;
