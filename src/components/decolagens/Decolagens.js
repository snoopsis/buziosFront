import React, { useContext, useEffect } from "react";
import vesselContext from "../../context/details/vesselContext";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: 20
  },
  container: {
    maxHeight: 440
  }
});

export default function Decolagens() {
  useEffect(() => {
    getDecolagens();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const VesselContext = useContext(vesselContext);

  const { getDecolagens, decolagens } = VesselContext;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: "procedencia", label: "Aero/Dest" },
    { id: "saida_aero", label: "Decolagem", align: "center" },
    { id: "prefixo", label: "Prefixo", align: "center" }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Compara as 2 propriedades do objeto
  function compare(a, b) {
    let comparison = 0;
    // Converte para um numero inteiro
    if (parseInt(a.saida_aero) > parseInt(b.saida_aero)) {
      // Se existir decolagem pela tarde muda a ordem do array
      comparison = -1;
    } else if (a.saida_aero < b.saida_aero) {
      // Se nao existir decolagens pela tarde mantem ordem inicial do array
      comparison = 1;
    }
    return comparison;
  }

  return (
    <Paper className={classes.root}>
      {decolagens.length !== 0 && (
        <TableContainer className={classes.container}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Chip
              label="Monitoramento Aeroportos Offshore"
              color="primary"
              style={{ marginBottom: 20 }}
            />
          </Grid>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {decolagens
                .sort(compare)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={decolagens.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Paper>
  );
}
