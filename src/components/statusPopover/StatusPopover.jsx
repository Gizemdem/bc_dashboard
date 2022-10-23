import React from "react";
import { Popover,Grid, Typography } from "@mui/material";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const StatusPopover = (props) => {

    const id = props.id;
    const open = props.open;
    const anchorElem = props.anchorElem;
    const handleClose = props.onClose;
    const curIfcRecords = props.curIfcRecords;
    const sendElementToTable = props.sendElementToTable;

    return (
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
                  <>
                    <React.Fragment key={key}>
                      <Typography component='dt' variant='body2'>{key}</Typography>
                      <Typography sx={{ pb: 1 }} component='dd'>{curIfcRecords[key]}</Typography>                    
                    </React.Fragment>                        
                  </>
                )}
              </Grid>
              <TextField />
              <Button onClick={sendElementToTable}>Ok</Button>
            </Grid>
          </Popover>
    )
}

export {StatusPopover};