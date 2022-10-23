import "./check.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import {Color} from "three";
import { ViewerContainer } from "../../components/viewerContainer/ViewerContainer";
import React, { createRef, useState, useEffect } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";

const Check = () => {
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
        }
    }, []);

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
      
    return (
        <div className="check"> 
            <Sidebar openDoc={ifcOnLoad} />
            <div className="container" > 
                <Navbar/>
                <div >
                    <ViewerContainer className="viewerContainer"
                        ref={ifcContainer}
                        viewer={viewer}
                    />
                </div>

            </div>          
        </div>
    )
}

export default Check