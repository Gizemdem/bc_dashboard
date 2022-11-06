import "./dashboard.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import {Color, MeshLambertMaterial} from "three";
import { ViewerContainer } from "../../components/viewerContainer/ViewerContainer";
import React, { createRef, useState, useEffect } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import ElementTable from "../../components/elementTable/ElementTable";

import GetAppIcon from '@mui/icons-material/GetApp';
import {utils, writeFileXLSX} from "xlsx";

import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import "@google/model-viewer/dist/model-viewer";

const Dashboard = () => {
    const [isLoading, setLoading] = useState(false);
    const [isClippingPaneSelected, setClippingPaneSelected] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);

    const ifcContainer = createRef();
    const [viewer, setViewer] = useState();
    const [ifcLoadingErrorMessage, setIfcLoadingErrorMessage] = useState();

    
    window.onkeydown = (event) => {
        if(event.code === 'Escape') {
            
            viewer.IFC.selector.unpickIfcItems();
            viewer.IFC.selector.unHighlightIfcItems();
        }
    }

    
    
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
    }, [ifcContainer.current]);

    const ifcOnLoad = async () => {
        const file = "https://raw.githubusercontent.com/IFCjs/hello-world/main/IFC/01.ifc";
        if (file && viewer) {

            // reset
            setIfcLoadingErrorMessage('');
            setLoading(true);

            // load file
            const model = await viewer.IFC.loadIfcUrl(file);
            await viewer.shadowDropper.renderShadow(model.modelID);

            // update information
            setSnackbarOpen(true);
            setLoading(false)
        }
    };
    const ifcOnLoadError = async (err) => {
        setIfcLoadingErrorMessage(err.toString());
    };

    const toggleClippingPlanes = async () => {
        console.log("clippingplane is loading");
        if (viewer) {
          viewer.toggleClippingPlanes();
          if (viewer.clipper.active) {
            setClippingPaneSelected(true);
          } else {
            setClippingPaneSelected(false);
          }
        }
      };

    const changeColor = (id, status) => {
        // access the model and change color according to status
        console.log("Changing color");
        console.log(status);
        let color = new Color(0.0 ,0.0 ,0.0);
        
        if (status ==="On Process") {
            color = new Color('#ffdfad');
        }
        else if(status === "Completed"){
            color = new Color('#f16f70');
        }
        else if(status === "On Inspection"){
            color = new Color('#679b9c');
        }
        else if(status === "Payed"){
            color = new Color('#6887c5');
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

    // export excel 
    const exportExcel= ()=>{
        var wb = utils.book_new(),
        ws = utils.json_to_sheet(selectedData);
        utils.book_append_sheet(wb,ws, "Sheet1");
        //  get current date
        const current = new Date();
        const date = `${current.getDate()}.${current.getMonth()+1}.${current.getFullYear()}`;
        let fileName = `BIMDatabase_${date}.xlsx`
        writeFileXLSX(wb, fileName);
    }

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
            // console.log(viewer.IFC.context.scene.scene)
            exportGLTF(viewer.IFC.context.scene.scene)
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
    }
    const [modelURL, setModelURL] = useState("");
    
    //
    //IFC -- GLB
    //
      
    return (
        <div className="dashboard"> 
            <Sidebar openDoc={ifcOnLoad} cropActivate={toggleClippingPlanes} />
            <div className="homeContainer" > 
                <Navbar/>
                <div >
                    <ViewerContainer className="viewerContainer"
                        ref={ifcContainer}
                        viewer={viewer}
                        setSelectedData={handleSaveData}
                        changeColor={changeColor}
                    />
                </div>
                <div className="listContainer">
                    <div className="listTitle"> 
                        <p>Project Database</p>
                        <GetAppIcon onClick={exportExcel}/>
                    </div>      
                    <ElementTable data={selectedData}/>
                </div> 
                <div className="arContainer">
                    <model-viewer src={modelURL} alt="" camera-controls ar ar-placement="floor" ar-scale="fixed" > </model-viewer>
                    <button className="formButton" onClick={exportScene}> AR</button>
                </div>
            </div> 
         
        </div>
    )
}

export default Dashboard