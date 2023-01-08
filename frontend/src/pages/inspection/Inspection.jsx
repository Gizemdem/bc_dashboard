import "./inspection.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Widget from "../../components/widget/Widget"

import {Color, MeshLambertMaterial, MeshStandardMaterial} from "three";
import { ViewerContainer } from "../../components/viewerContainer/ViewerContainer";
import React, { createRef, useState, useEffect } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import ElementTable from "../../components/elementTable/ElementTable";

import GetAppIcon from '@mui/icons-material/GetApp';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import "@google/model-viewer/dist/model-viewer";

const Inspection = () => {
    const ifcContainer = createRef();
    const [viewer, setViewer] = useState();

    
    window.onkeydown = (event) => {
        if(event.code === 'Escape') {
            
            viewer.IFC.selector.unpickIfcItems();
            viewer.IFC.selector.unHighlightIfcItems();
        }
    }

    //toggle switch model viewer / AR
    const [toggleSwitch, setToggleSwitch] = React.useState('viewer');
    const handleChange = (event, newToggleSwitch) => {
        if (newToggleSwitch === "ar") {exportScene()}
        setToggleSwitch(newToggleSwitch);
    };

    
    // List of selected elements
    const [selectedData, setSelectedData] = useState([]);

    const handleSaveData = (newElement) => {        
        // To do: check if the new element already exists in the array
        // For example: when changing the date a previous element
        setSelectedData( oldArray => {
            const elementIndex = oldArray.findIndex((elem) => elem.GlobalId === newElement.GlobalId);
            if (elementIndex !== -1) {
                // updating to new element
                oldArray[elementIndex] = newElement;
                return [...oldArray];
            }
            else {
                return [...oldArray, newElement];
            }            
        } );
    }

    useEffect(() => {
        // debugger;
        if (ifcContainer.current) {
            const container = ifcContainer.current;
            const ifcViewer = new IfcViewerAPI({container, backgroundColor: new Color(0xffffff)});
            ifcViewer.addAxes();
            ifcViewer.addGrid();
            ifcViewer.IFC.setWasmPath('../../');
            ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
                COORDINATE_TO_ORIGIN: true,
                USE_FAST_BOOLS: false,
                });
            setViewer(ifcViewer);            
            // getting the path from local storage, project files are in Project Page
            let path = localStorage.getItem("projectPath");
            if (path !== "" ){
                ifcViewer.IFC.loadIfcUrl(localStorage.getItem("projectPath"));
            } 
        }
    }, [toggleSwitch]);

    const changeColor = (id, status) => {
        // access the model and change color according to status
        console.log("Changing color");
        console.log(status);
        let color = new Color(0.0 ,0.0 ,0.0);
        
        if (status ==="Assigned") {
            color = new Color('#ffdfad');
        }
        else if(status === "Doing"){
            color = new Color('#F8E220');
        }
        else if(status === "Inspection"){
            color = new Color('#1DE02D');
        }
        else if(status === "Review"){
            color = new Color('#2DC5F7');
        }
        else if(status === "Revision"){
            color = new Color('#651DE0');
        }
        else if(status === "Done"){
            color = new Color('#FF2F3D');
        }
        else if(status === "Payed"){
            color = new Color('#F88B75');
        }
        
        // ToDo! this only works if there is only one ifc model
        const modelId = 0;
        
        viewer.IFC.loader.ifcManager.removeSubset(modelId, undefined);

        // Creates subset material
        const mat = new MeshLambertMaterial({
            transparent: true,
            opacity: 0.6,
            color: color,
            depthTest: true,
        })
        // console.log(viewer);
        const scene = viewer.context.getScene();
        // console.log(scene);

        // Creates subset
        const result = viewer.IFC.loader.ifcManager.createSubset({
            modelID: modelId,
            ids: [id],
            material: mat,
            scene: scene,
            removePrevious: false
        });
        // console.log(result);
        
        scene.add(result);
        
        setViewer(viewer);

    }

    // // export excel 
    // const exportExcel= ()=>{
    //     var wb = utils.book_new(),
    //     ws = utils.json_to_sheet(selectedData);
    //     utils.book_append_sheet(wb,ws, "Sheet1");
    //     //  get current date
    //     const current = new Date();
    //     const date = `${current.getDate()}.${current.getMonth()+1}.${current.getFullYear()}`;
    //     let fileName = `BIMDatabase_${date}.xlsx`
    //     writeFileXLSX(wb, fileName);
    // }

    //
    //IFC -- GLB
    //
    const exportGLTF=(input)=>{
        const gltfexporter= new GLTFExporter();
        const options = {
            trs: false,
            onlyVisible:true,
            binary:true,
            maxTextureSize:4096
        }
        gltfexporter.parse(
            input, 
            (result)=>{if (result instanceof ArrayBuffer){
                //save buffer to state
                save(new Blob( [result], {type:"application/octet-stream"}), "test.glb")
            }},
            (error)=>{console.log(error)},
            options
        )

    }


    //button onClick AR
    const exportScene =()=>{
        if (viewer){
            let scene = viewer.IFC.context.scene.scene;
            // console.log(viewer.IFC.context.scene.scene)
            let ifcIndex = 0;
            for (let i = 0; i < scene.children.length; i++) {
                if (scene.children[i].ifcManager !== undefined) {
                    ifcIndex = i;
                }
            }
            
            debugger;
            for (let j = 0; j < scene.children[ifcIndex].material.length; j ++) {

                let color = {...scene.children[ifcIndex].material[j].color};
                let newColor = new Color (color.r, color.g, color.b);
                let material = new MeshStandardMaterial({
                    color: newColor,
                    transparent: true,
                    opacity: 0.5
                });
                
                scene.children[ifcIndex].material[j] = material;
            }
            exportGLTF(scene)
        }
    } 
    //create a link and download
    const link = document.createElement('a');
    link.style.display="none";
    const save=(blob, filename)=>{
        link.href=URL.createObjectURL(blob);
        console.log(link)
        // link.download = filename;
        // link.click();
        setModelURL(link.href);
        debugger;
        const arViewer = document.querySelector("model-viewer");
        arViewer.addEventListener('load', (e) => {
            console.log("loaded ar viewer");
            debugger;
            let viewer = document.querySelector("model-viewer");
            viewer.model?.materials.forEach((mat) => mat.setAlphaCutoff(0.5))
            // console.log(e);
        })
        // console.log(arViewer);
    }
    const [modelURL, setModelURL] = useState("");
    
    return (
        <div className="inspection"> 
            <Sidebar/>
            <div className="homeContainer" > 
                <Navbar/>
                <div className="switchContainer">
                    <ToggleButtonGroup
                        color="primary"
                        value={toggleSwitch}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        >
                        <ToggleButton value="viewer">Viewer</ToggleButton>
                        <ToggleButton value="ar">AR</ToggleButton>
                    </ToggleButtonGroup>
                    {toggleSwitch ==="ar"? 
                    <model-viewer
                        src={modelURL} 
                        alpha-test="1"
                        alt="" 
                        camera-controls 
                        ar 
                        ar-placement="floor" 
                        ar-scale="fixed" 
                        load={()=> (console.log("loading ar model"))}
                        className="viewerContainer" > 
                        
                    </model-viewer>
                    :  
                    <ViewerContainer className="viewerContainer"
                        ref={ifcContainer}
                        viewer={viewer}
                        setSelectedData={handleSaveData}
                        changeColor={changeColor}                      
                    />
                    }

                    {/* <button className="formButton" onClick={exportScene}> AR</button> */}
                </div>
                <div className="issueContainer">
                    <div className="issueTitle"> 
                        <p>Issue Kanban</p>
                        <GetAppIcon/>
                    </div>
                    <div className="widgets">
                        <Widget type="active"/>
                        <Widget type="inprocess"/>
                        <Widget type="solved"/>
                    </div>     
                </div> 
            </div>          
        </div>
    )
}

export default Inspection