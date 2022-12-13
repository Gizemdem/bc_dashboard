import "./totalcosttable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TotalCostFromContract = () => {

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">To</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount/USDC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>          
            <TableRow>
                <TableCell className="tableCell">Main Contractor</TableCell>
              <TableCell className="tableCell">February 2020</TableCell>
              <TableCell className="tableCell">60400</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TotalCostFromContract;