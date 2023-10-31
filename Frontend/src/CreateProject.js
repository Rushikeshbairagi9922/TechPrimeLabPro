import React, { useEffect, useState } from "react";

import logo from "../src/img/Logo.svg";
import back from "../src/img/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Navbar from "./Navbar";

function CreatePro() {
  const navigate = useNavigate();
  const [reasons, setReason] = useState([]);
  const [types, setTypes] = useState([]);
  const [divs, setDivs] = useState([]);
  const [cates, setCates] = useState([]);
  const [prios, setPrios] = useState([]);
  const [depts, setDepts] = useState([]);
  const [locs, setLocss] = useState([]);

  const [proname, setProname] = useState([]);
  const [resid, setResid] = useState([]);
  const [typeid, setTypeid] = useState([]);
  const [divid, setDivid] = useState([]);
  const [cateid, setCateid] = useState([]);
  const [prioid, setPrioid] = useState([]);
  const [deptid, setDeptid] = useState([]);
  const [startdate, setStartdate] = useState([]);
  const [endtdate, setEnddate] = useState([]);
  const [locid, setLocid] = useState([]);
  const [statusid, setStatusid] = useState([]);

  
  const jwtToken = localStorage.getItem('token');
  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("http://localhost:8081/dropreson",{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })
      .then((response) => {
        setReason(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      // console.log(jwtToken)
  }, []);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("http://localhost:8081/droptype",{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })
      .then((response) => {
        setTypes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("http://localhost:8081/dropdiv",{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })
      .then((response) => {
        setDivs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("http://localhost:8081/dropcate",{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })
      .then((response) => {
        setCates(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("http://localhost:8081/dropprio",{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })
      .then((response) => {
        setPrios(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("http://localhost:8081/dropdept",{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })
      .then((response) => {
        setDepts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("http://localhost:8081/droploc",{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })
      .then((response) => {
        setLocss(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(
      proname,
      startdate,
      endtdate,
      resid,
      typeid,
      divid,
      cateid,
      prioid,
      deptid,
      locid,
      statusid
    );
    if (
      proname &&
      startdate &&
      endtdate &&
      resid &&
      typeid &&
      divid &&
      cateid &&
      prioid &&
      deptid &&
      locid
    ) {
      // Send a POST request to save employee details
      axios
        .post("http://localhost:8081/createproject", {
          proname,
          startdate,
          endtdate,
          resid,
          typeid,
          divid,
          cateid,
          prioid,
          deptid,
          locid,
          statusid,
        },{
          headers: {
            'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
          }
        })
        .then((response) => {
          console.log("after create" + response.data);
          // Clear the form fields after successful submission
          setProname("");
          setStartdate("");
          setEnddate("");
          setResid("");
          setTypeid("");
          setDivid("");
          setCateid("");
          setPrioid("");
          setDeptid("");
          setLocid("");
          setStatusid("");
          navigate("/ProjectList");
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    } else {
      console.error("Invalid or missing data");
    }
  };

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
            <h5 className="title-name">Create Project</h5>
          </div>
          <img src={logo} className="img" alt="logo" />
        </header>

        <Form onSubmit={handleSubmit} className="create-box">
          <Row
            className="align-items-center"
            // style={{ margin: 10, width: 1200 }}
          >
            <Col  >
              <Form.Control
                // style={{ height: "100px", color: "dark" }}
                size="md"
                type="text"
                className="text"
                placeholder="Enter Project Name"
                value={proname}
                onChange={(e) => setProname(e.target.value)}
                required
              />
            </Col>
            <Col xs="auto">
            <button
                type="submit"
                className="btn-save"
                value="Submit"
                style={{ marginLeft: "200px" }}
              >
                {" "}
                Save Project{" "}
              </button>
            </Col>
          </Row>

          <div style={{ margin: 20, width: 1200 }}>
            <br />
            <Row className="align-items-center">
              <Col xs="lg">
                <label htmlFor="" style={{ color: "gray" }}>
                  Reason
                </label>
                <Col>
                  <select
                    className="sectin"
                    onChange={(e) => setResid(e.target.value)}
                    required
                  >
                    <option>Select an Reason</option>
                    {reasons.map((item) => (
                      <option key={item.reasonid} value={item.reasonid}>
                        {item.reasonName}
                      </option>
                    ))}
                  </select>
                </Col>
              </Col>

              <Col xs="lg">
                <label htmlFor="" style={{ color: "gray" }}>
                  Type
                </label>
                <Col>
                  <select
                    className="sectin"
                    onChange={(e) => setTypeid(e.target.value)}
                    required
                  >
                    <option>Select an Type</option>
                    {types.map((item) => (
                      <option key={item.protypeid} value={item.protypeid}>
                        {item.protypename}
                      </option>
                    ))}
                  </select>
                </Col>
              </Col>

              <Col xs="lg">
                <label htmlFor="" style={{ color: "gray" }}>
                  Division
                </label>
                <Col>
                  <select
                    className="sectin"
                    onChange={(e) => setDivid(e.target.value)}
                    required
                  >
                    <option value="">Select an Divison</option>
                    {divs.map((item) => (
                      <option key={item.prodivid} value={item.prodivid}>
                        {item.prodivname}
                      </option>
                    ))}
                  </select>
                </Col>
              </Col>
            </Row>

            <br />
            <Row className="align-items-center">
              <Col xs="lg">
                <label style={{ color: "gray" }}>Category</label>
                <Col>
                  <select onChange={(e) => setCateid(e.target.value)} required>
                    <option>Select an Category</option>
                    {cates.map((item) => (
                      <option key={item.procatid} value={item.procatid}>
                        {item.procatname}
                      </option>
                    ))}
                  </select>
                </Col>
              </Col>
              <Col xs="lg">
                <label style={{ color: "gray" }}>Priority</label>
                <Col>
                  <select onChange={(e) => setPrioid(e.target.value)} required>
                    <option>Select an Priority</option>
                    {prios.map((item) => (
                      <option key={item.proprioid} value={item.proprioid}>
                        {item.prodprioname}
                      </option>
                    ))}
                  </select>
                </Col>
              </Col>
              <Col xs="lg">
                <label htmlFor="" style={{ color: "gray" }}>
                  Department
                </label>
                <Col>
                  <select onChange={(e) => setDeptid(e.target.value)} required>
                    <option>Select an Department</option>
                    {depts.map((item) => (
                      <option key={item.prodeptid} value={item.prodeptid}>
                        {item.prodeptname}
                      </option>
                    ))}
                  </select>
                </Col>
              </Col>
            </Row>

            <br />
            <Row className="align-items-center">
              <Col xs="lg">
                <Col xs="lg">
                  <label for="startdate" style={{ color: "gray" }}>
                    Start Date as per Project Plan{" "}
                  </label>
                </Col>
                <Col xs="lg">
                  <input
                    type="date"
                    id="startdate"
                    className="date"
                    value={startdate}
                    onChange={(e) => setStartdate(e.target.value)}
                    required
                  />
                </Col>
              </Col>

              <Col xs="lg">
                <Col xs="lg">
                  <label for="enddate" style={{ color: "gray" }}>
                    End Date as per Project Plan
                  </label>
                </Col>
                <Col xs="lg">
                  <input
                    type="date"
                    id="enddate"
                    className="date"
                    value={endtdate}
                    placeholder="start"
                    onChange={(e) => setEnddate(e.target.value)}
                    required
                  ></input>
                </Col>
              </Col>

              <Col xs="lg">
                <label style={{ color: "gray" }}>Location</label>
                <Col>
                  <select onChange={(e) => setLocid(e.target.value)} required>
                    <option>Select an Location</option>
                    {locs.map((item) => (
                      <option key={item.prolocid} value={item.prolocid}>
                        {item.prolocname}
                      </option>
                    ))}
                  </select>
                </Col>
            
              </Col>
            </Row>

            <div className="reg-tag" style={{ marginLeft: "68%" }}>
              <lable>
                {" "}
                Status : <span style={{ fontWeight: "bold" }}>Registered</span>
              </lable>
            </div>
          </div>
          
          {/* <div className="medianev"><Navbar></Navbar></div> */}
          <button
                type="submit"
                className="btn-med"
                value="Submit"
                style={{ marginLeft: "200px" }}
              >
                {" "}
                Save Project{" "}
              </button>
        </Form>
      </section>
    </div>
  );
}

export default CreatePro;
