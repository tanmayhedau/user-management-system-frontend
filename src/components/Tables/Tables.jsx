import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import "./tables.css";
import { BASE_URL } from "../../services/Helper";
import { NavLink } from "react-router-dom";
import { statusChange } from "../../services/Apis";
import toast from "react-hot-toast";
import Paginations from "../Pagination/Paginations";

const Tables = ({
  userdata,
  deleteUser,
  fetchUser,
  handlePrevious,
  handleNext,
  setPage,
  page,
  pageCount,
}) => {
  const handleChange = async (id, status) => {
    const response = await statusChange(id, status);
    if (response.data.success) {
      fetchUser();
      toast.success("Status is updated");
    } else {
      console.log("Error");
    }
  };
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>id</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((ele, i) => {
                      return (
                        <>
                          <tr>
                            <td>{i + 1 + (page - 1) * 4}</td>
                            <td>{ele.fname + " " + ele.lname}</td>
                            <td>{ele.email}</td>
                            <td>{ele.gender === "Male" ? "M" : "F"}</td>
                            <td className="d-flex align-items-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic">
                                  <Badge
                                    bg={
                                      ele.status === "Active"
                                        ? "primary"
                                        : "danger"
                                    }>
                                    <span>{ele.status}</span> &nbsp;
                                    <i className="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(ele._id, "Active")
                                    }>
                                    Active
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(ele._id, "InActive")
                                    }>
                                    InActive
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent">
                              <img
                                src={`${BASE_URL}/uploads/${ele.profile}`}
                                alt="img"
                              />
                            </td>
                            <td>
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  variant="light"
                                  className="dropdown_btn"
                                  id="dropdown-basic">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/userprofile/${ele._id}`}
                                      className={"text-decoration-none"}>
                                      <i
                                        class="fa-solid fa-eye"
                                        style={{ color: "green" }}></i>
                                      &nbsp;
                                      <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${ele._id}`}
                                      className={"text-decoration-none"}>
                                      <i
                                        class="fa-solid fa-pen-to-square"
                                        style={{ color: "orange" }}></i>
                                      &nbsp;
                                      <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div onClick={() => deleteUser(ele._id)}>
                                      <i
                                        class="fa-solid fa-trash"
                                        style={{ color: "red" }}></i>
                                      &nbsp;
                                      <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="no_data text-center"> No Data Found</div>
                  )}
                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};

export default Tables;
