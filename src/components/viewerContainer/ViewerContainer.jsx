import "./viewerContainer.scss";
import React, { useState, forwardRef } from "react";

import { IFCViewerAPI } from "web-ifc-viewer";
import { StatusPopover } from "../statusPopover/StatusPopover";



const ViewerContainer = forwardRef((props, ref) => {

  const [anchorElem, setAnchorElem] = useState(null);
  const [curIfcRecords, setIfcRecords] = useState();
  

  const viewer = props.viewer;
  const open = Boolean(anchorElem);
  const id = open ? "simple-popover" : undefined;
  const setSelectedData = props.setSelectedData;
  
  const handleClose = () => {
    setAnchorElem(null);
  };


  const sendElementToTable = () => {
    setSelectedData(curIfcRecords);
  }

  const ifcOnClick = async (event) => {
      if (viewer) {
          const result = await viewer.IFC.pickIfcItem(true);
          if (result) {
            const props = await viewer.IFC.getProperties(result.modelID, result.id, false);
            // console.log(props);
            const type = await viewer.IFC.loader.ifcManager.getIfcType(result.modelID, result.id);
            // convert props to record
            if (props) {
              let ifcRecords = {};
              ifcRecords['Entity Type'] = type;
              ifcRecords['GlobalId'] = props.GlobalId && props.GlobalId?.value;
              ifcRecords['Name'] = props.Name && props.Name?.value;
              ifcRecords['ObjectType'] = props.ObjectType && props.ObjectType?.value;
              ifcRecords['PredefinedType'] = props.PredefinedType && props.PredefinedType?.value;
              ifcRecords['Date']="";
              setIfcRecords(ifcRecords);
              
              // let prev = selectedData;
              // prev.push(ifcRecords);
              
              // console.log(selectedData)
            }
    
            setAnchorElem(event.target);
            // console.log(selectedData);
          }
      }
  };


  // Create clipping plane
  const ifcOnRightClick = async () => {
      if (viewer) {
        viewer.clipper.deleteAllPlanes();
        viewer.clipper.createPlane();
      }
    }
    
    return (
        <>
          <div className= "viewerContainer" style={{
                position: 'relative',
                overflow: 'hidden',                

                }}
            ref={ref}
            onDoubleClick={ifcOnClick}
            onContextMenu={ifcOnRightClick}
            onMouseMove={viewer && (() => viewer.IFC.selector.prePickIfcItem())}
          />
          <StatusPopover
            id={id}
            open={open}
            anchorElem={anchorElem}
            onClose={handleClose}
            curIfcRecords={curIfcRecords}
            sendElementToTable={sendElementToTable}
          />
        </>
      );
});

export {ViewerContainer}