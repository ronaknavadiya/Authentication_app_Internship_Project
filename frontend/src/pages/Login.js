import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setisLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/loginUser", {
        email: email,
        password: password,
      });

      toast.success(
        "User has been Logged in sucessfully, now you can edit your detail from profile page"
      );
      navigate("/profilePage");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Row>
      <Col xs={12} sm={12} md={6} lg={6}>
        <h2>Login User</h2>
        <Form>
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
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </Col>
    </Row>
  );
};

export default Login;
