import React from 'react'
import Dashboard from "../src/img/Dashboard.svg";
import dashact from "../src/img/Dashboard-active.svg"
import ProjectList from "../src/img/Project-list.svg";
import projact from "../src/img/Project-list-active.svg";
import CreateProject from "../src/img/create-project.svg";
import creprojact from "../src/img/create-project-active.svg";
import logout from "../src/img/Logout.svg";
import dash from "../src/img/dash.png";
import { useState} from 'react';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [iconActive, setIconActive] = useState(null);
   
  const handleIconClick = (iconname) => {
    
      setIconActive(iconname); // Toggle the icon state
      
    console.log(iconname)
  };
  return (
    <div className="navbar">
        <div className="menu">
          <img          
            src={iconActive === 'Dashboard'? dashact : Dashboard}
            className="dashb-img"
            alt="dashboard"
            onClick={() => {handleIconClick('Dashboard') ;navigate("/Dashboard");} }
          />
          <img
            src={iconActive === 'ProjectList' ? projact : ProjectList  }
            className="list-img"
            alt="list"
            onClick={() => {handleIconClick('ProjectList'); navigate("/ProjectList");}}
            
          />
          <img src={dash} className="dash-img" alt="dash" />
          <img
            src={iconActive === 'createproject'? creprojact : CreateProject  }
            className="cre-img"
            alt="create"
            onClick={() => {handleIconClick('CreateProject') ;navigate("/CreateProject");}}
          />
        </div>
        <div className="logout">
        
          <img
            src={logout}
            className="nav-img"
            alt="logout"
            
            onClick={() => {handleIconClick() ;navigate("/");}}
          />
        </div>
      </div>
  )
}

export default Navbar;



