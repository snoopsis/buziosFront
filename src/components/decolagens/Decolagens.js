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
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 550
  }
});

export default function Decolagens(props) {
  useEffect(() => {
    getDecolagens();
    setInterval(() => getDecolagens(), 15000);
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
    var comparaA = a.saida_aero.replace(":", "");
    var comparaB = b.saida_aero.replace(":", "");
    // Converte para um numero inteiro
    if (parseInt(comparaA) > parseInt(comparaB)) {
      // Se existir decolagem pela tarde muda a ordem do array
      comparison = -1;
    } else if (comparaA < comparaB) {
      // Se nao existir decolagens pela tarde mantem ordem inicial do array
      comparison = 1;
    }
    return comparison;
  }

  return (
    <Paper className={classes.root}>
      {decolagens.length !== 0 ? (
        <TableContainer className={classes.container}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Paper
                elevation={0}
                style={{
                  marginBottom: "5px",
                  fontWeight: "100",

                  height: "100px",
                  backgroundColor: "#212121",
                  textAlign: "center"
                }}
              >
                <Typography
                  variant="body1"
                  component="h1"
                  style={{
                    padding: 15,
                    textTransform: "uppercase",
                    color: "#fff",
                    fontWeight: 400
                  }}
                >
                  Decolagens em Tempo Real
                </Typography>

                <Typography variant="body1" style={{ color: "#fff" }}>
                  Todos os Voos Programados no SITAER
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Button
            color="f0f0f0"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => props.history.push("/")}
          ></Button>
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
      ) : (
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Paper
              elevation={0}
              style={{
                marginBottom: "5px",
                fontWeight: "100",

                height: "100px",
                backgroundColor: "#212121",
                textAlign: "center"
              }}
            >
              <Typography
                variant="body1"
                component="h1"
                style={{
                  padding: 15,
                  textTransform: "uppercase",
                  color: "#fff",
                  fontWeight: 400
                }}
              >
                Decolagens em Tempo Real
              </Typography>

              <Typography variant="body1" style={{ color: "#fff" }}>
                Hoje ate ao momento ainda nao existem Decolagens
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}
