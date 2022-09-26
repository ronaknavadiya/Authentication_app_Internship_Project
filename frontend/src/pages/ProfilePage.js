import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userId, setUserId] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  console.log(user);
  console.log("Email:", email, password);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:5000/api/editUser", {
        firstname: fname,
        lastname: lname,
        email: email,
        password: password,
        _id: userId,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("Editd data:", res.data.user);

      toast.success(
        "User has been created sucessfully, now you can edit your detail from profile page"
      );
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {
    let storageUser = localStorage.getItem("user");
    storageUser = JSON.parse(storageUser);
    setUser(storageUser);

    if (storageUser == undefined) {
      navigate("/");
    } else {
      setTimeout(() => {
        setEmail(user?.email || "");
        setPassword(user?.password || "");
        setFname(user?.firstname || "");
        setLname(user?.lastname || "");
        setUserId(user?._id || "");
      }, 0);
    }
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Button
        variant="secondary"
        type="button"
        className="mt-3"
        onClick={(e) => handleLogout(e)}
      >
        Logout
      </Button>
      <UserProfileComp className="mt-5">
        <div className="info-image-container col-md-12">
          <div className="col-md-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1057/1057231.png?w=360"
              alt="userimage"
              className="userImage"
            />
          </div>
          {user && (
            <div className="info-container mt-4">
              <h2 className="username">
                {user.firstname}
                {user.lastName}
              </h2>
              <div className="user-info-details">
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
                    Edit
                  </Button>
                </Form>
              </div>
            </div>
          )}
        </div>
      </UserProfileComp>
    </>
  );
};

const UserProfileComp = styled.div`
  .info-image-container {
    display: flex;
    justify-content: space-around;
    margin: 18px 0px;
  }
  .border {
    margin-top: -2px;
    border-bottom: 1px solid #1f1209 !important;
    box-shadow: 0 20px 20px -20px #333;
  }
  .userImage {
    width: 200px;
    height: 200px;
    border-radius: 80px;
  }
  .info-container {
    /* width: 50rem; */
    align-self: center;
    width: 50%;
    /* justify-content: center; */
    text-align: -webkit-center;
  }
  .user-info-details {
    display: flex;
    justify-content: space-between;
    width: 108%;
  }
  .books-galary {
    margin-top: 2rem;
    img {
      width: 200px;
      height: 200px;
    }
  }
  .username {
    justify-self: center;
    width: fit-content;
    margin-top: -5rem;
    margin-bottom: 2rem;
    text-align: -webkit-center;
  }
  .follow-unfollow-btn {
    border-radius: 4px;
    background: var(--blue);
    padding: 10px 22px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    font-size: 1.5rem;
    margin-top: 2rem;
    &:hover {
      transition: all 0.2s ease-in-out;
      background: #fff;
      color: #010606;
      border: 1px solid var(--blue);
    }
  }
  .hovermodal {
    position: absolute;
    top: 0;
  }
  .books {
    .row {
      h3 {
        margin: 1rem;
      }
      input {
        margin-right: 1rem;
        font-size: 2rem;
      }
    }
  }
`;
const Title = styled.div`
  margin: 25px 0px;
  color: rgba(27, 79, 114);
  h2 {
    font-size: 22px;
  }
`;

export default ProfilePage;
