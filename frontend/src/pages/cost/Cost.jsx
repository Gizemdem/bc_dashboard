import React, { createRef, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./cost.scss";
import CostTable from "./CostTable";
import {Color, MeshLambertMaterial} from "three";
import { CostViewer } from "./CostViewer";
import { IfcViewerAPI } from "web-ifc-viewer";
import { useStore } from "../../hooks/useStore";
import {
    progressPaymentContract,
    connectWallet,
    getCurrentWalletConnected,
    setConstructionElements,
    payElements,
} from "../../util/interact.js";


const Cost = ()=>{

    const [addCost, updateCost, deleteCost ] = useStore((state) => [state.addCost, state.updateCost, state.deleteCost ])
    const [storedCost] = useStore((state) => [
        state.costs
    ])

    const ifcContainer = createRef();
    const [viewer, setViewer] = useState();

    //State variables for contract
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [elements, setElements] = useState([]);
    const contractorWalletAddress = "0xaCd2741F67F8Dc0633256c77Ed1cfE05E0a2c54b";
    const [selectedData, setSelectedData] = useState([]);
    //called only once
    useEffect(() => {
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
        debugger;
        const {ids,costs} = getIdandCost(selectedData);

        const { status } = await setConstructionElements(walletAddress, contractorWalletAddress, ids,costs);
        setStatus(status);
    };
    const payApprovedElements = async () => {
        const {status} = await payElements(walletAddress,["window"])
        setStatus(status);
    };

    window.onkeydown = (event) => {
        if(event.code === 'Escape') {
            
            viewer.IFC.selector.unpickIfcItems();
            viewer.IFC.selector.unHighlightIfcItems();
        }
    }
    // List of selected elements   

    const getIdandCost = (data) => {
        let costs = [];
        let ids = [];
        for (let elem of data) {
            costs.push(elem['cost']); 
            ids.push(elem['GlobalId']);
        }
        return {ids,costs}

    }
    const handleSaveData = (newElement) => {
        debugger;
        // To do: Save with UseStore
        if (storedCost.findIndex((elem) => elem.GlobalId === newElement.GlobalId) === -1) {

            addCost(newElement.GlobalId, newElement.cost);
        }
        else {
            updateCost(newElement.GlobalId, newElement.cost);
        }
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

    const changeColor = (id) => {
        debugger;
        // access the model and change color according to status
        console.log("Changing color");
        // console.log(status);
        let color = new Color('blue');
        
        // if (status ==="Assigned") {
        //     color = new Color('#ffdfad');
        // }
        // else if(status === "Doing"){
        //     color = new Color('#F8E220');
        // }
        
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
                    <div style={{width:"600px"}}>
                        <div className="container" >
                            <CostViewer className="costViewer"
                                ref={ifcContainer}
                                viewer={viewer}
                                setSelectedData={handleSaveData}
                                changeColor={changeColor}
                            />           
                        </div>
                    </div>
                    <div style={{width:"600px"}}>
                        <div className="containerTable">
                            <p classname="message"id="status">{status}</p>
                            <hr></hr>
                            <div className="bottom">
                                <button className="formButton" id="walletButton" onClick={connectWalletPressed}>
                                    {walletAddress.length > 0 ? (
                                        "Connected: " +
                                        String(walletAddress).substring(0, 6) +
                                        "..." +
                                        String(walletAddress).substring(38)
                                    ) : (
                                        <span>Connect Wallet</span>
                                    )}
                                </button>
                                <button className="formButton" id="publishButton" onClick={onUpdatePressed}>
                                    Send Elements and Cost
                                </button>
                                {/* <button onClick={payApprovedElements}>Sent Transaction</button> */}                            
                            </div>
                            <p >Cost Input</p>
                            <CostTable className="top" data={storedCost} handleDelete={deleteCost}/>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cost;