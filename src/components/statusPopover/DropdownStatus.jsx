import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropdownStatus=()=> {
  const [progresStatus, setProgresStatus] = React.useState('');

  const handleChange = (event) => {
    setProgresStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }} marginBottom="20px">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Progress</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={progresStatus}
          label="Progress"
          onChange={handleChange}
        >
          <MenuItem value={"blue"}>On Process</MenuItem>
          <MenuItem value={"green"}>Completed</MenuItem>
          <MenuItem value={"pink"}>On Inspection</MenuItem>
          <MenuItem value={"purple"}>Payed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default DropdownStatus;