import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./projects.scss";
import ProjectFolder from "../../components/projectFolder/ProjectFolder";

const Projects= () => {
    //in future this will trigger the project url
    const openProject=()=>{
        console.log("clicks works")
    }
    return(
        <div className="projects">
            <Sidebar/>
            <div className="projectsContainer">
                <Navbar/>
                <div className="folderContainer">
                    <span className="title">PROJECTS</span>
                    <div className="folderComponent">
                    <ProjectFolder img="folder_icon.png" openProject={openProject} projectName="Test Project 1"/>
                    <ProjectFolder img="folder_icon.png" projectName="Test Project 2"/>
                    <ProjectFolder img="folder_icon.png" projectName="Test Project 3"/>
                    <ProjectFolder img="add_folder_icon.png" projectName="Test Project 4"/>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default Projects