import React, { useEffect, useState } from "react";
import logo from "../src/img/Logo.svg";
import Navbar from "./Navbar";
import axios from "axios";
import Chart from "./Chart";


function Dashboard() {
  const jwtToken = localStorage.getItem('token');
  const [clouser, setClouser] = useState([]);
  const [counter, setCounter] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/counter",{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })
      .then((response) => {
        setCounter(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/closercount",{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      })
      .then((response) => {
        setClouser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div className="cre-pro">
      <Navbar></Navbar>

      <section className="main">
        <header>
          <div className="title">
            <h5 className="title-name" style={{ marginLeft: "69px" }}>
              Dashboard
            </h5>
          </div>
          <img src={logo} className="img" alt="logo" />
        </header>

        <div className="main-dash">
          <ul className="token">
            {counter.map((dataT) => {
              return (
                <li className="tile">
                  Total project<span className="totl">{dataT.totalProject}</span>
                </li>
              );
            })}

            {counter.map((dataT) => {
              return (
                <li className="tile">
                  Closed<span className="clo">{dataT.Closed}</span>
                </li>
              );
            })}
            {counter.map((dataT) => {
              return (
            <li className="tile">
              Running<span className="run">{dataT.Running}</span>
            </li>
              );
            })}
            {counter.map((dataT) => {
              return (
            <li className="tile">
              Closure Delay<span className="clos">{dataT.Clouser}</span>
            </li>
             );
            })}
            {counter.map((dataT) => {
              return (
            <li className="tile">
              Cancelled<span className="can">{dataT.Cancelled}</span>
            </li>
              );
            })}
          </ul>
        </div>

        <h4 style={{ marginLeft: "30px" }}>
          Department wise - Total Vs Closed
        </h4>
        <Chart> </Chart>
      </section>
    </div>
  );
}

export default Dashboard;
