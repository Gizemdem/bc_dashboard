import "./viewerContainer.scss";
import React, { useState, forwardRef } from "react";
import { Popover,Grid, Typography } from "@mui/material";
import { IFCViewerAPI } from "web-ifc-viewer";

const ViewerContainer = forwardRef((props, ref) => {
    const [anchorElem, setAnchorElem] = useState(null);
    const [curIfcRecords, setIfcRecords] = useState();

    const viewer = props.viewer;
    const open = Boolean(anchorElem);
    const id = open ? "simple-popover" : undefined;

    const handleClose = () => {
        setAnchorElem(null);
    };

    const ifcOnClick = async (event) => {
        if (viewer) {
            const result = await viewer.IFC.pickIfcItem(true);
            if (result) {
              const props = await viewer.IFC.getProperties(result.modelID, result.id, false);
              console.log(props);
              const type = await viewer.IFC.loader.ifcManager.getIfcType(result.modelID, result.id);
              // convert props to record
              if (props) {
                let ifcRecords = {};
                ifcRecords['Entity Type'] = type;
                ifcRecords['GlobalId'] = props.GlobalId && props.GlobalId?.value;
                ifcRecords['Name'] = props.Name && props.Name?.value;
                ifcRecords['ObjectType'] = props.ObjectType && props.ObjectType?.value;
                ifcRecords['PredefinedType'] = props.PredefinedType && props.PredefinedType?.value;
                setIfcRecords(ifcRecords);
              }
      
              setAnchorElem(event.target);
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
          <Popover
            id={id}
            open={open}
            anchorElem={anchorElem}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Grid
              container
              component='dl'
              spacing={2}
              sx={{ p: 2 }}>
              <Grid item>
                {curIfcRecords && Object.keys(curIfcRecords).map((key) =>
                  curIfcRecords[key] &&
                  <React.Fragment key={key}>
                    <Typography component='dt' variant='body2'>{key}</Typography>
                    <Typography sx={{ pb: 1 }} component='dd'>{curIfcRecords[key]}</Typography>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </Popover>
        </>
      );
});

export {ViewerContainer}