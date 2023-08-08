import React, { useContext, useEffect, useState } from "react";
import "../Home/home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
import Tables from "../../components/Tables/Tables";
import Spin from "../../components/Spin/Spin";
import { useNavigate } from "react-router-dom";
import {
  addData,
  deleteData,
  updateData,
} from "../../components/Context/ContextProvider";
import { getUsers, userDelete, exportToCSV } from "../../services/Apis";
import toast from "react-hot-toast";

const Home = () => {
  const [showspin, setShowspin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { useradd, setUseradd } = useContext(addData);
  const { update, setUpdate } = useContext(updateData);
  const { dlt, setDelete } = useContext(deleteData);

  const [userdata, setUserdata] = useState([]);

  const navigate = useNavigate();

  const addUser = () => {
    navigate("/register");
  };

  //fetch user
  const fetchUser = async () => {
    const response = await getUsers(search, gender, status, sort, page);
    if (response.data.success) {
      setUserdata(response.data.usersData);
      setPageCount(response.data.pagination.pageCount);
    } else {
      console.log("error in fetching user data");
    }
  };

  //delete user
  const deleteUser = async (id) => {
    const response = await userDelete(id);
    if (response.data.success) {
      fetchUser();
      setDelete(response.data.user);
    } else {
      toast.error("error");
    }
  };

  //export user
  const exportuser = async () => {
    const response = await exportToCSV();
    if (response.status == 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("something went wrong please try again later");
    }
  };

  //pagination
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    fetchUser();
    setTimeout(() => {
      setShowspin(false);
    }, 1200);
  }, [search, gender, status, sort, page]);

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd?.userData?.fname?.toUpperCase()} Successfully Added
        </Alert>
      ) : (
        ""
      )}

      {update ? (
        <Alert variant="success" onClose={() => setUpdate("")} dismissible>
          {update?.fname?.toUpperCase()} Successfully Updated
        </Alert>
      ) : (
        ""
      )}
      {dlt ? (
        <Alert variant="danger" onClose={() => setDelete("")} dismissible>
          {dlt?.fname?.toUpperCase()} Successfully Deleted
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <div className="main_div">
          {/* search and button */}
          <div className="search-add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" className="" onClick={addUser}>
                <i className="fa-solid fa-plus"></i> &nbsp; Add User
              </Button>
            </div>
          </div>
          {/* export , gender, sort and  status */}
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn" onClick={exportuser}>
                Export to csv
              </Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-around">
                  <Form.Check
                    type="radio"
                    label="All"
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="filter_newold">
              <h3>Sort By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New data
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old data
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="filter_status">
              <div className="status">
                <h3>Filter by Status</h3>
                <div className="status_radio d-flex justify-content-around flex-wrap">
                  <Form.Check
                    type="radio"
                    label="All"
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type="radio"
                    label="Active"
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="InActive"
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showspin ? (
          <Spin />
        ) : (
          <Tables
            userdata={userdata}
            deleteUser={deleteUser}
            fetchUser={fetchUser}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default Home;
