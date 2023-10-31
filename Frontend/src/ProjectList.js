import React, { useState, useEffect } from "react";
import logo from "../src/img/Logo.svg";
import back from "../src/img/chevron-left.svg";
import Dropdown from "react-bootstrap/Dropdown";
import { CustomMenu } from "../src/SortDropdown";
import { CustomToggle } from "../src/SortDropdown";
import searchi from "../src/img/search.svg";
import axios from "axios";
import Navbar from "./Navbar";
import { color } from "highcharts";
const jwtToken = localStorage.getItem('token');
function ProjectList() {
  const [selectedSortOption, setSelectedSortOption] = useState(" ");
  const [projects, setProject] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (selectedSortOption === "Reason") {
          response = await axios.get(
            `http://localhost:8081/sortreson/${currentPage}`,{
              headers: {
                'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
              }
            }
          );
        } else if (selectedSortOption === "Priority") {
          response = await axios.get(
            `http://localhost:8081/sortpriority//${currentPage}`,{
              headers: {
                'Authorization': `Bearer ${jwtToken}`, 
              }
            }
          );
        } else if (selectedSortOption === "Type") {
          response = await axios.get(
            `http://localhost:8081/sorttype/${currentPage}`,{
              headers: {
                'Authorization': `Bearer ${jwtToken}`,
              }
            }
          );
        } else if (selectedSortOption === "Division") {
          response = await axios.get(
            `http://localhost:8081/sortdivision/${currentPage}`,{
              headers: {
                'Authorization': `Bearer ${jwtToken}`, 
              }
            }
          );
        } else if (selectedSortOption === "Category") {
          response = await axios.get(
            `http://localhost:8081/sortcategory/${currentPage}`,{
              headers: {
                'Authorization': `Bearer ${jwtToken}`, 
              }
            }
          );
        } else if (selectedSortOption === "Department") {
          response = await axios.get(
            `http://localhost:8081/sortdept/${currentPage}`,{
              headers: {
                'Authorization': `Bearer ${jwtToken}`, 
              }
            }
          );
        } else if (selectedSortOption === "Location") {
          response = await axios.get(
            `http://localhost:8081/sortlocation/${currentPage}`,{
              headers: {
                'Authorization': `Bearer ${jwtToken}`,
              }
            }
          );
        } else if (selectedSortOption === "Status") {
          response = await axios.get(
            `http://localhost:8081/sortstatus/${currentPage}`,{
              headers: {
                'Authorization': `Bearer ${jwtToken}`,
              }
            }
          );
        } else if (selectedSortOption === " ") {
          response = await axios.get(
            `http://localhost:8081/projectlist/${currentPage}`,{
              headers: {
                'Authorization': `Bearer ${jwtToken}`, 
              }
            }
          );
        }
        console.log(currentPage);
        setProject(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, [currentPage, selectedSortOption, status]);

  const handleSortBy = (sortingOption) => {
    setSelectedSortOption(sortingOption);
  };

  console.log(selectedSortOption);

  useEffect(() => {
    console.log(searchInput);
    axios
      .get("http://localhost:8081/search", { proname: searchInput },{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })

      .then((res) => {
        setSearch(res.data);
        console.log("ok " + res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    console.log(searchInput);
  }, [searchInput]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatus = async (proid, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/${newStatus}`,
        {
          proid: proid,
        },{
          headers: {
            'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
          }
        },
        []
      );
      console.log("status" + response.data + response.data);

      if (response.status === 200) {
        setStatus(proid);
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  console.log(searchInput);
  console.log(currentPage);
  console.log(projects.length);
  console.log(projects);

  return (
    <div className="cre-pro">
      <Navbar></Navbar>
      <section className="main">
        <header>
          <div className="title">
            <img
              src={back}
              className="back-img"
              style={{ color: "white" }}
              alt="logo"
            />
            <h5 className="title-name">Project Listing</h5>
          </div>
          <img src={logo} className="img" alt="logo" />
        </header>

        <div className="pro-list-main">
          <div className="pro-list-head">
            <div className="ser-bar">
              <img
                src={searchi}
                className="ser-img"
                style={{ marginTop: "10px" }}
                alt="logo"
              />
              <input
                type="text"
                className="search"
                placeholder="Search projects.."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              ></input>

              <Dropdown className="dropdown">
                Sort By :
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  {selectedSortOption}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => handleSortBy("Reason")}
                  >
                    Reason
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => handleSortBy("Type")}
                  >
                    Type
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="3"
                    onClick={() => handleSortBy("Division")}
                  >
                    Division
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="4"
                    onClick={() => handleSortBy("Category")}
                  >
                    Category
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="5"
                    onClick={() => handleSortBy("Priority")}
                  >
                    Priority
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="6"
                    onClick={() => handleSortBy("Department")}
                  >
                    Department
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="7"
                    onClick={() => handleSortBy("Location")}
                  >
                    Location
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="8"
                    onClick={() => handleSortBy("Status")}
                  >
                    Status
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {/* /////////////////////// */}
          <div className="App">
            <center>
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th style={{ backgroundColor: "lightblue" }} scope="col">
                      Project Title
                    </th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    >
                      Reason
                    </th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    >
                      Type
                    </th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    >
                      Division
                    </th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    >
                      Category
                    </th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    >
                      Priority
                    </th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    >
                      Department
                    </th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    >
                      Location
                    </th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    >
                      Status
                    </th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    ></th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    ></th>
                    <th
                      align="center"
                      style={{ backgroundColor: "lightblue" }}
                      scope="col"
                    ></th>
                  </tr>
                </thead>

                {projects.map((dataObj) => {
                  console.log(dataObj.proname);
                  return (
                    <tbody>
                      <tr key={dataObj.proid}>
                        <td className="trow-tr">
                          <span style={{ fontWeight: "bold" }}>
                            {dataObj.proname}
                          </span>

                          <span className="time-rw">
                            {dataObj.prostartdate} to {dataObj.proenddate}
                          </span>
                        </td>

                        <td className="trow">{dataObj.Reason}</td>
                        <td className="trow">{dataObj.Type}</td>
                        <td className="trow">{dataObj.Division}</td>
                        <td className="trow">{dataObj.category}</td>
                        <td className="trow">{dataObj.priority}</td>
                        <td className="trow">{dataObj.Department}</td>
                        <td className="trow">{dataObj.location}</td>
                        <td className="trow">{dataObj.status}</td>
                        <td className="trow">
                          <button
                            className="btn1"
                            style={{ color: "white" }}
                            type="button"
                            onClick={() => handleStatus(dataObj.proid, "uprun")}
                          >
                            Start
                          </button>{" "}
                        </td>
                        <td className="trow">
                          <button
                            className="bttn"
                            type="button"
                            onClick={() =>
                              handleStatus(dataObj.proid, "upclose")
                            }
                          >
                            Close
                          </button>{" "}
                        </td>
                        <td className="trow">
                          <button
                            className="bttn"
                            type="button"
                            onClick={() =>
                              handleStatus(dataObj.proid, "upcancle")
                            }
                          >
                            Cancle
                          </button>{" "}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </center>
          </div>

          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(projects.length / itemsPerPage) },

              (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    i + 1 === currentPage ? "active" : ""
                  }`}
                >
                  <button className="page-link" onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default ProjectList;
