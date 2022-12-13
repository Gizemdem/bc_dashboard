import React from "react";
import "./statusPopover.scss"
import { Popover,Grid, Typography } from "@mui/material";
import Button from '@mui/material/Button';
//datepicker imports
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//dropdown status
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StatusPopover = (props) => {

  const id = props.id;
  const open = props.open;
  const anchorElem = props.anchorEl;
  const handleClose = props.onClose;
  const curIfcRecords = props.curIfcRecords;
  const sendElementToTable = props.sendElementToTable;

  // callback to viewer container to update colors
  const updateColors = props.updateColors;

  //set date properties
  const [date, setDate] = React.useState();
  const handleSetDate=(dateValue)=>{
    if (dateValue !== null) { 
    setDate(dateValue);
    }
  }
  //Estmated Time Construction
  const [etcDate, setETCDate] = React.useState();
  const handleSetETCDate=(dateValue)=>{
    if (dateValue !== null) { 
    setETCDate(dateValue);
    }
  }

  //set progress status properties
  const [progresStatus, setProgresStatus] = React.useState('');
  const handleChangeStatus = (event) => {
    setProgresStatus(event.target.value);
  };
    
  return (
    <Popover className="statusPopover" 
      id={id}
      open={open}
      anchorElem={anchorElem}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      // anchorPosition={{top:100, right:100}}      
    > 
      <p className="titleTop">PROPERTIES</p> 	
      <Grid className="topDiv">
        {curIfcRecords && Object.keys(curIfcRecords).map((key) =>
          curIfcRecords[key] &&
          <>            
            <React.Fragment key={key}>
              <Typography  className="topTitle" component='dt' variant='body2' >{key}</Typography>
              <Typography sx={{ pb: 1 }} component='dd'>{curIfcRecords[key]}</Typography>                    
            </React.Fragment>                        
          </>
        )}
      </Grid>      
      <Grid className="bottomDiv">  
        <p className="bottomTitle">SET PROPERTIES</p> 
        <Box sx={{ minWidth: 120 }} marginBottom="10px" marginTop="10px">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Progress</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={progresStatus}
              label="Progress"
              onChange={(event) => {
                handleChangeStatus(event);
              }}
            >
              <MenuItem key="assigned" value={"Assigned"}>Assigned</MenuItem>
              {/* <MenuItem key="doing" value={"Doing"}>Doing</MenuItem> */}
              {/* <MenuItem key="inspection" value={"Inspection"}>Inspection</MenuItem> */}
              <MenuItem key="review" value={"Review"}>Review</MenuItem>
              {/* <MenuItem key="revision" value={"Revision"}>Revision</MenuItem> */}
              <MenuItem key="done" value={"Done"}>Done</MenuItem>
              {/* <MenuItem key="payed" value={"Payed"}>Payed</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
            
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <DatePicker className="bottomItems"
            label="Set Date"
            value={date}
            onChange={(newValue) => {
              handleSetDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {/* conditionally render the estimated time construction */}
        {progresStatus ==="Assigned"? 
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <DatePicker className="bottomItems"
            label="ETC"
            value={etcDate}
            onChange={(newValue) => {
              handleSetETCDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> : null}

        <Button  className="button" onClick={()=>{
          // We create a new copy of the ifc element with date and progress before sending 
          let newElement = {...curIfcRecords};
          newElement["ETC"]=etcDate.format("DD.MMM.YY");
          newElement["Date"] = date.format("DD.MMM.YY");
          newElement["Progress"] = progresStatus;
          sendElementToTable(newElement); 
          updateColors(progresStatus); 
          handleClose()
        }}
        >Confirm</Button>
      </Grid> 
    </Popover>
  )
}
export {StatusPopover};