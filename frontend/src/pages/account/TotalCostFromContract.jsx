import "./totalcosttable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStore } from "../../hooks/useStore";


const dollarUSLocale = Intl.NumberFormat('en-US');
const euroDELocale = Intl.NumberFormat('de-DE');
const deDate = Intl.DateTimeFormat("de-DE")


const TotalCostFromContract = () => {

  const [storedCost] = useStore((state) => [
    state.costs
  ])
  const [storedElements] = useStore((state) => [
    state.elements
  ])

  const totalCost = () => {

    let total = 0;
    storedCost?.forEach(element => {
      if (storedElements.find(elem => elem.GlobalId === element.GlobalId)){
        total += element.cost;
      }
    });
    return `${euroDELocale.format(total)} €`;
  }

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
              <TableCell className="tableCell">December 2023</TableCell>
              <TableCell className="tableCell">{totalCost(storedCost)}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TotalCostFromContract;