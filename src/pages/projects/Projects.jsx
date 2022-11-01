import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./projects.scss";
import ProjectFolder from "../../components/projectFolder/ProjectFolder";
import {Link} from "react-router-dom";

const Projects= () => {

    //project list path
    const projectFiles= ["../../IFCprojects/01.ifc", "../../IFCprojects/room.blend.ifc","../../IFCprojects/01.ifc", "../../IFCprojects/room.blend.ifc"];
    
    return(
        <div className="projects">
            <Sidebar/>
            <div className="projectsContainer">
                <Navbar/>
                <div className="folderContainer">
                    <span className="title">PROJECTS</span>
                    <div className="folderComponent">
                    <ProjectFolder img="folder_icon.png" path={projectFiles[0]} projectName="Test Project 1"/>
                    <ProjectFolder img="folder_icon.png" path={projectFiles[1]} projectName="Test Project 2"/>
                    <ProjectFolder img="folder_icon.png" path={projectFiles[2]} projectName="Test Project 3"/>
                    <ProjectFolder img="add_folder_icon.png" path={projectFiles[3]} projectName="Test Project 4"/>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default Projects