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
  const anchorElem = props.anchorElem;
  const handleClose = props.onClose;
  const curIfcRecords = props.curIfcRecords;
  const sendElementToTable = props.sendElementToTable;
  //set date properties
  const [date, setDate] = React.useState();
  const handleSetDate=(newValue)=>{
    if (newValue !== null){ 
        if (curIfcRecords){
          curIfcRecords["Date"]=newValue.format("DD.MMM.YY");
        }
        setDate(newValue);
    }
    // console.log(newValue.format("DD.MMM.YY"))
    // console.log(curIfcRecords)
  }

  //set progress status properties
  const [progresStatus, setProgresStatus] = React.useState('');
  const handleChange = (event) => {
    if (curIfcRecords){
      curIfcRecords["Progress"]=event.target.value;
    }
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
      anchorPosition={{top:100, right:100}}      
    > 
      <p className="titleTop">PROPERTIES</p> 	
      <Grid className="topDiv">
        {curIfcRecords && Object.keys(curIfcRecords).map((key) =>
          curIfcRecords[key] &&
          <>            
            <React.Fragment key={key}>
              <Typography  className="topTitle" component='dt' variant='body2'>{key}</Typography>
              <Typography sx={{ pb: 1 }} component='dd'>{curIfcRecords[key]}</Typography>                    
            </React.Fragment>                        
          </>
        )}
      </Grid>
      
      <Grid className="bottomDiv">  
        <p className="bottomTitle">SET PROPERTIES</p> 
        <Box sx={{ minWidth: 120 }} marginBottom="20px">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Progress</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={progresStatus}
              label="Progress"
              onChange={(event) => {
                handleChange(event);
              }}
            >
              <MenuItem value={"On Process"}>On Process</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"On Inspection"}>On Inspection</MenuItem>
              <MenuItem value={"Payed"}>Payed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* <DropdownStatus className="bottomItems"/> */}
        <LocalizationProvider className="bottomItems" dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Set Date"
            value={date}
            onChange={(newValue) => {
              handleSetDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button  className="button" onClick={sendElementToTable}>Confirm</Button>
      </Grid> 
    </Popover>
  )
}
export {StatusPopover};