import React, { createRef, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./cost.scss";
import CostTable from "./CostTable";
import {Color, MeshLambertMaterial} from "three";
import { ViewerContainer } from "../../components/viewerContainer/ViewerContainer";
import { IfcViewerAPI } from "web-ifc-viewer";

import {
    progressPaymentContract,
    connectWallet,
    getCurrentWalletConnected,
    setConstructionElements,

} from "../../util/interact.js";

const Cost = ()=>{
    const ifcContainer = createRef();
    const [viewer, setViewer] = useState();

    //State variables for contract
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("No connection to the network.");
    const [elements, setElements] = useState([]);
    //called only once
    useEffect(() => { //TODO: implement
        async function fetchWallet() {
            const {address, status} = await getCurrentWalletConnected();
            setWallet(address);
            setStatus(status); 
          }
          fetchWallet();
    }, []);

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setWallet(walletResponse.address);
    };

    const onUpdatePressed = async () => {
        const { status } = await setConstructionElements(walletAddress, ["wall", "column","window"],[10,20,50]);
        setStatus(status);
    };

    window.onkeydown = (event) => {
        if(event.code === 'Escape') {
            
            viewer.IFC.selector.unpickIfcItems();
            viewer.IFC.selector.unHighlightIfcItems();
        }
    }
    // List of selected elements
    const dummyData = [
        {
            id: '12345',
            price: 500,
        },
        {
            id: '12346',
            price: 100,
        },
    ]
    const [selectedData, setSelectedData] = useState(dummyData);

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

    return(
        <div className="cost">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="rowContainer">
                    <div className="container">
                        <ViewerContainer className="viewercontainer" 
                            ref={ifcContainer}
                            viewer={viewer}
                            setSelectedData={handleSaveData}
                            changeColor={changeColor}
                        />           
                    </div>
                    <div className="container">
                        <p>Cost Input</p>
                        <CostTable data={selectedData}/>
                        <button id="walletButton" onClick={connectWalletPressed}>
                            {walletAddress.length > 0 ? (
                                "Connected: " +
                                String(walletAddress).substring(0, 6) +
                                "..." +
                                String(walletAddress).substring(38)
                            ) : (
                                <span>Connect Wallet</span>
                            )}
                        </button>
                    </div>
                    <div>
                        <input
                        type="text"
                        placeholder="Add elements and its cost in your smart contract."
                        onChange={(e) => setElements(e.target.value)}
                        value={elements}
                        />
                        <p id="status">{status}</p>
                        <button id="publishButton" onClick={onUpdatePressed}>
                        Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cost;