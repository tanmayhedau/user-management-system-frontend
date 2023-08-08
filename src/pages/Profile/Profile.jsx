import React, { useEffect, useState } from "react";
import "../Profile/profile.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Spin from "../../components/Spin/Spin";
import { useParams } from "react-router-dom";
import { fetchSingleUser } from "../../services/Apis";
import { BASE_URL } from "../../services/Helper";
import moment from "moment";

const Profile = () => {
  const [showspin, setShowspin] = useState(true);
  const [userprofile, setUserprofile] = useState({});
  const { id } = useParams();

  const singleUser = async () => {
    const response = await fetchSingleUser(id);
    console.log(response);
    if (response.data.success) {
      setUserprofile(response.data.userData);
    } else {
      console.log("error")
    }
  };

  useEffect(() => {
    singleUser();
    setTimeout(() => {
      setShowspin(false);
    }, 1200);
  }, [id]);

  return (
    <>
      {showspin ? (
        <Spin />
      ) : (
        <div className="container">
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img
                      src={`${BASE_URL}/uploads/${userprofile.profile}`}
                      alt="img"
                    />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{userprofile.fname + " " + userprofile.lname}</h3>
                <h4>
                  <i className="fa-solid fa-envelope"></i>
                  <span> {" :- " + userprofile.email}</span>
                </h4>
                <h5>
                  <i className="fa-solid fa-mobile"></i>
                  <span> {" :- " + userprofile.mobile}</span>
                </h5>
                <h4>
                  <i className="fa-solid fa-person"></i>
                  <span>{" :- " + userprofile.gender}</span>
                </h4>
                <h4>
                  <i className="fa-solid fa-location-crosshairs"></i>
                  <span>{" :- " + userprofile.location}</span>
                </h4>
                <h4>
                  Status
                  <span> {" :- " + userprofile.status}</span>
                </h4>
                <h5>
                  <i className="fa-solid fa-calendar-days"></i> Date created
                  <span>
                    {" :- " +
                      moment(userprofile.datecreated).format("DD-MM-YYYY")}
                  </span>
                </h5>
                <h5>
                  <i className="fa-solid fa-calendar-days"></i> Date updated
                  <span>
                    {" :- " +
                      moment(userprofile.datecreated).format("DD-MM-YYYY")}
                  </span>
                </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
