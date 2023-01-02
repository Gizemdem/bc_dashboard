import "./costViewer.scss";
import React, { useState, forwardRef } from "react";

import { StatusPopover } from "./StatusPopover";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const CostViewer = forwardRef((props, ref) => {
  
  const [anchorElem, setAnchorElem] = useState();
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
        const result = await viewer.IFC.selector.pickIfcItem(true, true);
        if (result) {
          setSelected(result);
          const props = await viewer.IFC.getProperties(result.modelID, result.id, false);
          // console.log(selected);
          const type = await viewer.IFC.loader.ifcManager.getIfcType(result.modelID, result.id);
          // convert props to record
          if (props) {
            let ifcRecords = {};
            ifcRecords['GlobalId'] = props.GlobalId && props.GlobalId?.value;
            setIfcRecords(ifcRecords);
          }  
          // setAnchorElem(event.target);
      }
    }
  };

  const updateColors = (status) => {
    // we pass status to know which color to apply on the element
    // status is one of "On progress" , "Payed" ..
    changeColor(selected.id, status);
  }

  // Create clipping plane
  const ifcOnRightClick = async () => {
    if (viewer) {
      viewer.clipper.deleteAllPlanes();
      viewer.clipper.createPlane();
    }
  }
  //palet for status popover
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  return (
    < >
      <div className= "costViewer"
        ref={ref}
        onDoubleClick={ifcOnClick}
        onContextMenu={ifcOnRightClick}
        //toDo when component reloads this gives error//
        //                                            //
        onMouseMove={viewer && (() => viewer.IFC.selector.prePickIfcItem())}
      >
        <Box sx={{ width: '100%' }}>
        </Box>
      </div>
      <StatusPopover 
        id={id}
        open={open}
        anchorEl={anchorElem}
        onClose={handleClose}
        curIfcRecords={curIfcRecords}
        sendElementToTable={sendElementToTable}
        updateColors={updateColors}
      />
    </>
  );
});

export {CostViewer}