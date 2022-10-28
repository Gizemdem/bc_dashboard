import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./projects.scss";

const Projects= () => {
    return(
        <div className="projects">
            <Sidebar/>
            <div className="projectsContainer">
                <Navbar/>
                <div className="folderContainer">
                   projects page check
                </div>                
            </div>
        </div>
    )
}

export default Projects