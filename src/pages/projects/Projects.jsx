import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./projects.scss";
import ProjectFolder from "../../components/projectFolder/ProjectFolder";
import ImportTable from "../../components/importTable/ImportTable";

import {readFile, utils, writeFile} from "xlsx"
 

const Projects= () => {

    // project list path
    const projectFiles= ["../../IFCprojects/01.ifc", "../../IFCprojects/BuroHalle_Einbauteile.ifc","../../IFCprojects/GB_City.ifc", "../../IFCprojects/room.blend.ifc"];
    
    // excel file upload
    const uploadExcelFile = (e) => {
        console.log("upload excel")
        const file = e.target.files[0]
        const reader= new FileReader()
        reader.onload=(event)=>{
            reader.onload=(event)=>{
                //parse data
                reader.readAsBinaryString(file)
                const bianaryString=event.target.result
                const workBook = readFile(bianaryString,{type:"bianary"})

                //first sheet
                const workSheetName= workBook.SheetNames[0]
                const workSheet = workBook.Sheets[workSheetName]

                const fileData = utils.sheet_to_json(workSheet, {header:1})
                console.log(fileData)
            }
        }
        
    }
 
    return(
        <div className="projects">
            <Sidebar/>
            <div className="projectsContainer">
                <Navbar/>
                <div className="folderContainer">
                    <span className="title">PROJECTS</span>
                    <div className="folderComponent">
                        
                        <ProjectFolder img={"./folder_icon.png"} path={projectFiles[0]} projectName="Test Project 01"/>
                        <ProjectFolder img={"./folder_icon.png"} path={projectFiles[1]} projectName="Bauteile Halle"/>
                        <ProjectFolder img={"./folder_icon.png"} path={projectFiles[2]} projectName="GB City"/>
                        <ProjectFolder img={"./add_folder_icon.png"} path={projectFiles[3]} projectName="Test Project 4"/>
                    </div>
                </div> 
                <div className="collaboratorContainer">
                    <div className="topContainer">
                        <p>COLLABORATORS</p>
                        <p onClick={uploadExcelFile} className="uploadbutton">Upload Excel</p>
                    </div>
                    <div className="bottomUpload">
                        here the excel table comes
                        <ImportTable />
                    </div>
                </div>               
            </div>
        </div>
    )
}

export default Projects