import React, { useContext, useEffect, useState } from "react";
import "../Register/register.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import toast from "react-hot-toast";
import Spin from "../../components/Spin/Spin";
import { userRegister } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import { addData } from "../../components/Context/ContextProvider";


const Register = () => {
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showspin, setShowspin] = useState(true);

  const navigate = useNavigate();
  const { useradd, setUseradd } = useContext(addData);

  // status options
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  //setInput value
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    // console.log(inputData);
  };

  //status
  const handleStatusValue = (e) => {
    setStatus(e.value);
  };

  //profile
  const handleProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmitUserData = async(e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = inputData;

    if (fname === "") {
      toast.error("please enter your first name");
    } else if (lname === "") {
      toast.error("please enter your last name");
    } else if (email === "") {
      toast.error("please enter your email");
    } else if (!email.includes("@")) {
      toast.error("please enter valid email");
    } else if (mobile === "") {
      toast.error("please enter your mobile no.");
    } else if (mobile.length > 10 || mobile.length < 10) {
      toast.error("please enter valid mobile no.");
    } else if (gender === "") {
      toast.error("please enter your gender");
    } else if (image === "") {
      toast.error("please enter your image");
    } else if (status === "") {
      toast.error("please select your status");
    } else if (location === "") {
      toast.error("please select your location");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("location", location);
      data.append("user_profile", image);

      const config = {
        "Content-Type" : "multipart/form-data"
      }

      const response = await userRegister(data,config)
      // console.log(response)
      if (response.data.success) {
        setInputData({
          ...inputData,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
        });
        setStatus("");
        setImage("");
        navigate("/");
        setUseradd(response.data)
      } else {
        toast.error("Error")
      }

      toast.success("Registration is done successfully");
    }
  };


  
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
     setTimeout(() => {
       setShowspin(false);
     }, 1200);
  }, [image]);

  return (
    <>
      {showspin ? (
        <Spin />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Register Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img src={preview ? preview : "./man.png"} alt="img" />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="email"
                    name="fname"
                    placeholder="Enter your First Name"
                    value={inputData.fname}
                    onChange={handleInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Enter your Last Name"
                    value={inputData.lname}
                    onChange={handleInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your Email ID"
                    value={inputData.email}
                    onChange={handleInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword">
                  <Form.Label>Mobile no.</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Enter your mobile no. "
                    value={inputData.mobile}
                    onChange={handleInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword">
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    value={"Male"}
                    onChange={handleInputValue}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value={"Female"}
                    onChange={handleInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} onChange={handleStatusValue} />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword">
                  <Form.Label>Select your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    onChange={handleProfile}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicPassword">
                  <Form.Label>Enter your Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Enter your location "
                    value={inputData.location}
                    onChange={handleInputValue}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmitUserData}>
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default Register;
