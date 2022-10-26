import "./topWidget.scss";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import PlacefolderImage from "./topWidget Image.jpg"

const TopWidget = () => {

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
      }, 800);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
        <div className="topWidget">

            <Stack spacing={50} direction="row" >         
            <CircularProgress variant="determinate" color="inherit" value={100} />
            <CircularProgress variant="determinate" color="inherit" value={100} />
            <CircularProgress variant="determinate" color="inherit" value={100} />
            <CircularProgress variant="determinate" color="inherit"value={progress} />
            </Stack>  
            <hr className="hr" />
        </div>
    )
}

export default TopWidget