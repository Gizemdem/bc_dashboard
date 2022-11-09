import "./projectFolder.scss"
import React from "react"
import {Link} from "react-router-dom"


const ProjectFolder=(props)=>{

    return (  
        <div className="folder">
            <Link to="/" style= {{textDecoration:"none"}} >
                <img src={props.img} className="folderImg" 
                onClick={()=>{localStorage.setItem("projectPath", process.env.PUBLIC_URL+props.path)}}
                alt=""
                />                    
                <p className="projectTitle">{props.projectName}</p>   
            </Link>         
        </div>
        
    )
}
export default ProjectFolder;

