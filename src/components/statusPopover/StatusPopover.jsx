import React from "react";
import "./statusPopover.scss"
import { Popover,Grid, Typography } from "@mui/material";
import Button from '@mui/material/Button';
//datepicker imports
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const StatusPopover = (props) => {

  const id = props.id;
  const open = props.open;
  const anchorElem = props.anchorElem;
  const handleClose = props.onClose;
  const curIfcRecords = props.curIfcRecords;
  const sendElementToTable = props.sendElementToTable;
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
    >
      {/* <Grid  
        container
        component='dl'
        spacing={2}
        sx={{ p: 2 }}
        > */}
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
          <Grid  className="bottomDiv">                 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
      {/* </Grid> */}
    </Popover>
  )
}

export {StatusPopover};