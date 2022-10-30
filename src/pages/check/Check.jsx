import "./check.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import {Color, MeshLambertMaterial} from "three";
import { ViewerContainer } from "../../components/viewerContainer/ViewerContainer";
import React, { createRef, useState, useEffect } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import ElementTable from "../../components/elementTable/ElementTable";

const Check = () => {
    const [isLoading, setLoading] = useState(false);
    const [isClippingPaneSelected, setClippingPaneSelected] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);

    const ifcContainer = createRef();
    const [viewer, setViewer] = useState();
    const [ifcLoadingErrorMessage, setIfcLoadingErrorMessage] = useState();

    
    // List of selected elements
    const [selectedData, setSelectedData] = useState([]);

    const handleSaveData = (newElement) => {
        
        // To do: check if the new element already exists in the array
        // For example: when changing the date a previous element
        setSelectedData( oldArray => {
            const elementIndex = oldArray.findIndex((elem) => elem.GlobalId === newElement.GlobalId);
            console.log(elementIndex);
            if (elementIndex !== -1) {
                // updating to new element
                oldArray[elementIndex] = newElement;

                return [...oldArray];
            }
            else {
                return [...oldArray, newElement];
                // oldArray.append(newElement);
                // return oldArray;
            }            
        } );
        
        // console.log(selectedData);
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

    const changeColor = (id) => {
        // access the model and change color according to status
        console.log(id);
        const color = new Color(1.0, 0.0, 0.0);
        // const id = '22620';
        const modelId = 0;

        console.log("Changing color");

        // Creates subset material
        const mat = new MeshLambertMaterial({
            transparent: true,
            opacity: 0.6,
            color: color,
            depthTest: true,
        })
        console.log(viewer);
        const scene = viewer.context.getScene();
        console.log(scene);

        // Creates subset
        const result = viewer.IFC.loader.ifcManager.createSubset({
            modelID: modelId,
            ids: [id],
            material: mat,
            scene: scene,
            removePrevious: false
        });
        console.log(result);
        
        scene.add(result);
        
        setViewer(viewer);

    }
      
    return (
        <div className="check"> 
            <Sidebar openDoc={ifcOnLoad} cropActivate={toggleClippingPlanes} />
            <div className="container" > 
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
                    <div className="listTitle"> Project Collaboration</div>      
                    <ElementTable data={selectedData}/>
                </div> 
            </div> 
         
        </div>
    )
}

export default Check