import "./elementTable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ElementTable = (props) => {

  const data = props.data;

  const handleDelete = (globalId, modelId) =>{
    // data(data.filter((item) => item.id !== id));
    props.onDelete(globalId, modelId);
  }
  
  
  console.log(data);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell className="tableCell">ID</TableCell> */}
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Global Id</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">ETC</TableCell>
            <TableCell className="tableCell">Progress Status</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row['GlobalId']}>
              <TableCell className="tableCell">{row['Entity Type']}</TableCell>
              <TableCell className="tableCell">{row['GlobalId']}</TableCell>
              <TableCell className="tableCell">{row['Name']}</TableCell>
              <TableCell className="tableCell">{row['ETC']}</TableCell>
              <TableCell className="tableCell">{row['Progress']}</TableCell>
              <TableCell className="tableCell">{row['Date']}</TableCell>
              <TableCell className="tableCell" > 
                {/* needs an action */}
                <DeleteOutlineOutlinedIcon onClick={() => handleDelete(row['GlobalId'], row['subsetId'])} />                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ElementTable;