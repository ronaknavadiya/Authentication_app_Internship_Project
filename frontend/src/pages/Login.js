import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [isLogin, setisLogin] = useState(false);


      const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make a popup alert showing the "submitted" text
        alert("Submited");
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
