import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./projects.scss";
import ProjectFolder from "../../components/projectFolder/ProjectFolder";



const Projects= () => {

    // project list path
    const projectFiles= ["/IFCprojects/01.ifc", "/IFCprojects/BuroHalle_Einbauteile.ifc","/IFCprojects/GB_City.ifc", "/IFCprojects/room.blend.ifc"]; 
    return(
        <div className="projects">
            <Sidebar/>
            <div className="projectsContainer">
                <Navbar/>
                <div className="folderContainer">
                    <span className="title">PROJECTS</span>
                    <div className="folderComponent">
                        
                        <ProjectFolder img={process.env.PUBLIC_URL +"/folder_icon.png"} path={projectFiles[0]} projectName="Test Project 01"/>
                        <ProjectFolder img={process.env.PUBLIC_URL +"/folder_icon.png"} path={projectFiles[1]} projectName="Bauteile Halle"/>
                        <ProjectFolder img={process.env.PUBLIC_URL +"/folder_icon.png"} path={projectFiles[2]} projectName="GB City"/>
                        <ProjectFolder img={process.env.PUBLIC_URL +"/add_folder_icon.png"} path={projectFiles[3]} projectName="Test Project 4"/>
                    </div>
                </div> 
                <div className="collaboratorContainer">
                    <div className="topContainer">
                        <p>COLLABORATORS</p>
                        <p className="uploadbutton">Upload Excel</p>
                    </div>
                    <div className="bottomUpload">
                        here the excel table comes
                        
                    </div>
                </div>               
            </div>
        </div>
    )
}

export default Projects