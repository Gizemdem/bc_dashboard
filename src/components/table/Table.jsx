import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      companyname:"X COMPANY",
      name: "Gizem",
      // img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      assignment: "Main Contractor",
      date: "1 March",
      mailaddres: "gizem@gmail.com",
      status: "Approved",
    },
    {
      id: 1143156,
      companyname:"X COMPANY",
      name: "Andres",
      // img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      assignment: "Main Contractor",
      date: "1 March",
      mailaddres: "andres@gmail.com",
      status: "Pending",
    },
    {
      id: 1143157,
      companyname:"X COMPANY",
      name: "Charnele",
      // img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      assignment: "Main Contractor",
      date: "1 March",
      mailaddres: "charnele@gmail.com",
      status: "Approved",
    },
    {
      id: 1143158,
      companyname:"X COMPANY",
      name: "Sara",
      // img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      assignment: "Main Contractor",
      date: "1 March",
      mailaddres: "sara@gmail.com",
      status: "Pending",
    },
    {
      id: 1143159,
      companyname:"X COMPANY",
      name: "Tim",
      // img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      assignment: "Main Contractor",
      date: "1 March",
      mailaddres: "tim@gmail.com",
      status: "Approved",
    },
    {
      id: 1143159,
      companyname:"X COMPANY",
      name: "Junaid",
      // img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      assignment: "Main Contractor",
      date: "1 March",
      mailaddres: "junaid@gmail.com",
      status: "Approved",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Company Name</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Assignment</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Mail Address</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">{row.companyname}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell">{row.assignment}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.mailaddres}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;