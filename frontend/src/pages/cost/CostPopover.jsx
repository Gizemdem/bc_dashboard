import React from "react";
import "./costPopover.scss"
import { Popover,Grid, Typography, Input } from "@mui/material";
import Button from '@mui/material/Button';
//datepicker imports
import TextField from '@mui/material/TextField';

//dropdown status
import Box from '@mui/material/Box';

const CostPopover = (props) => {
  const [cost, setCost] = React.useState(0);
  const id = props.id;
  const open = props.open;
  const anchorElem = props.anchorEl;
  const handleClose = props.onClose;
  const curIfcRecords = props.curIfcRecords;
  const sendElementToTable = props.sendElementToTable;

  // callback to viewer container to update colors
  const updateColors = props.updateColors;

  const handleCostChange = (event) => {
    let newCost = Number(event.target.value);
    if (newCost > 0) {
      setCost(newCost);
    }
  }
    
  return (
    <Popover className="statusPopover" 
      id={id}
      open={open}
      // anchorElem={anchorElem}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      // anchorPosition={{top:100, right:100}}      
    > 
      <Grid className="topDiv">
        {curIfcRecords && Object.keys(curIfcRecords).map((key) =>
          curIfcRecords[key] &&
          <>            
            <React.Fragment key={key}>
              <Typography  className="topTitle" component='dt' variant='body2' >{key}</Typography>
              <Typography sx={{ pb: 1, margin:"5px" }} component='dd'>{curIfcRecords[key]}</Typography>                    
            </React.Fragment>                        
          </>
        )}
      </Grid>      
      <Grid className="bottomDiv">  
        <p className="bottomTitle">Set Cost</p> 
        <input 
          value={cost}
          onChange={(newValue) => {handleCostChange(newValue)}}
          type="number"
          placeholder="Cost $"
          className="bottomItems"
          width="150px"
        />

        <Button  className="button" onClick={()=>{
          // We create a new copy of the ifc element with date and progress before sending 
          let newElement = {...curIfcRecords};
          newElement['cost'] = cost;
          sendElementToTable(newElement); 
          updateColors(); 
          handleClose()
        }}
        >Confirm</Button>
      </Grid> 
    </Popover>
  )
}
export {CostPopover};