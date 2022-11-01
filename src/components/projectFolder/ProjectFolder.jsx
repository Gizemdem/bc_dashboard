import "./projectFolder.scss"
import React from "react"

const ProjectFolder=(props)=>{
    return (  
        <div className="folder">
            <img src={`../images/${props.img}`} className="folderImg" />                    
            <p className="projectTitle">{props.projectName}</p>            
        </div>
        
    )
}
export default ProjectFolder;