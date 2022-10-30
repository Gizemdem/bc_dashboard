import "./viewerContainer.scss";
import React, { useState, forwardRef } from "react";
import {Color, MeshLambertMaterial} from "three";

import { IFCViewerAPI } from "web-ifc-viewer";
import { StatusPopover } from "../statusPopover/StatusPopover";
import { ViewDayRounded } from "@mui/icons-material";



const ViewerContainer = forwardRef((props, ref) => {

  const [anchorElem, setAnchorElem] = useState(null);
  const [curIfcRecords, setIfcRecords] = useState();

  // Callback from Check page to change colors in the scene
  const changeColor = props.changeColor;

  // save selected id, to send to change color
  const [selected, setSelected] = useState();

  const viewer = props.viewer;
  const open = Boolean(anchorElem);
  const id = open ? "simple-popover" : undefined;
  const setSelectedData = props.setSelectedData;
  
  const handleClose = () => {
    setAnchorElem(null);
  };


  const sendElementToTable = (newElement) => {
    setSelectedData(newElement);
  }

  const ifcOnClick = async (event) => {
    if (viewer) {
        const result = await viewer.IFC.pickIfcItem(true);
        if (result) {
          setSelected(result);
          const props = await viewer.IFC.getProperties(result.modelID, result.id, false);
          // console.log(selected);
          const type = await viewer.IFC.loader.ifcManager.getIfcType(result.modelID, result.id);
          // convert props to record
          if (props) {
            let ifcRecords = {};
            ifcRecords['Entity Type'] = type;
            ifcRecords['GlobalId'] = props.GlobalId && props.GlobalId?.value;
            ifcRecords['Name'] = props.Name && props.Name?.value;
            ifcRecords['ObjectType'] = props.ObjectType && props.ObjectType?.value;
            // ifcRecords['PredefinedType'] = props.PredefinedType && props.PredefinedType?.value;
            // ifcRecords['Date']="";
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

  const updateColors = () => {
    changeColor(selected.id);
  }

  // Create clipping plane
  const ifcOnRightClick = async () => {
    if (viewer) {
      viewer.clipper.deleteAllPlanes();
      viewer.clipper.createPlane();
    }
  }
    
  return (
    <div >
      <div className= "viewerContainer"
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
        updateColors={updateColors}
      />
    </div>
  );
});

export {ViewerContainer}