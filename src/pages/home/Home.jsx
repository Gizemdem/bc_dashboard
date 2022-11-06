import "./home.scss";
import Sidebar  from "../../components/sidebar/Sidebar" ;
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";

// import CommitContainer from "../../components/commitContainer/CommitContainer"

import TopWidget from "../../components/topWidget/TopWidget"


import Table from "../../components/table/Table";   
import {Color} from "three";
import { ViewerContainer } from "../../components/viewerContainer/ViewerContainer";
import React, { createRef, useState, useEffect } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";


import { ConstructionOutlined } from "@mui/icons-material";

const Home = () => {

    const [isLoading, setLoading] = useState(false);
    const [isClippingPaneSelected, setClippingPaneSelected] = useState(false);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);

    const ifcContainer = createRef();
    const [viewer, setViewer] = useState();
    const [ifcLoadingErrorMessage, setIfcLoadingErrorMessage] = useState();


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

        // ifcOnLoad().catch(console.log("Error"));
        // console.log("Loaded");
    }, []);

    const ifcOnLoad = async () => {
        //linked github
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

    const toggleClippingPlanes = () => {
        if (viewer) {
          viewer.toggleClippingPlanes();
          if (viewer.clipper.active) {
            setClippingPaneSelected(true);
          } else {
            setClippingPaneSelected(false);
          }
        }
      };
    //   ifcOnLoad();

    return (
        <div className="home"> 
            <Sidebar openDoc={ifcOnLoad} cropActivate={toggleClippingPlanes}/>
            <div className="homeContainer"> 
                <Navbar />
                <div className="widgets">
                    <TopWidget/>
                </div>
                <div className="widgets">
                    <Widget/>
                    <Widget/>
                    <Widget/>
                    <Widget/>
                </div>
                <div className="commit-viewer-containers">
                    <ViewerContainer className="viewerContainer"
                        ref={ifcContainer}
                        viewer={viewer}
                        setSelectedData={{}} 
                    />
                    {/* <CommitContainer className="commitContainer"  /> */}
                    
                </div>
                <div className="listContainer">
                    <div className="listTitle"> Project Collaboration</div>      
                    <Table />
                </div>               
            </div>          
        </div>
    )
}

export default Home