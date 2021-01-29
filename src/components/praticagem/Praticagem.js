import React, { useEffect, useContext } from "react";
import vesselContext from "../../context/details/vesselContext";
import moment from "moment";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import red from "@material-ui/core/colors/red";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[400]
    },
    secondary: {
      main: red[500]
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  tableHead: {
    color: "#f44336",
    fontWeight: "100"
  },
  tableRow: {
    fontWeight: "100"
  },
  tableTitle: {
    marginTop: "10px",
    marginBottom: "5px",
    fontWeight: "100",
    marginLeft: "5px",
    color: "#fff",
    height: "100px",
    backgroundColor: "#9c27b0"
  }
}));

export default function Praticagem() {
  useEffect(() => {
    getPraticagem();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const VesselContext = useContext(vesselContext);

  const { getPraticagem, praticagem } = VesselContext;

  const diaHoje = moment().format("DD/MM/YYYY");

  const rjpilots = praticagem.filter(
    res =>
      (res.data === diaHoje && res.navio.includes("SAPURA")) ||
      res.navio.includes("CBO") ||
      res.navio.includes("SKANDI") ||
      res.navio.includes("BRAM") ||
      res.navio.includes("STARNAV") ||
      res.navio.includes("SEVEN")
  );

  return (
    <div>
      {rjpilots.length !== 0 && (
        <ThemeProvider theme={theme}>
          <Paper elevation={0} className={classes.tableTitle}>
            <div style={{ paddingLeft: "20px", paddingTop: "20px" }}>
              <Typography variant="body1" component="h1">
                Praticagem Rio / RJ Pilots
              </Typography>
            </div>
            <div
              style={{
                paddingLeft: "20px",
                paddingTop: "15px"
              }}
            >
              <Typography variant="body2" component="h2">
                Programacao da Praticagem Rio de Janeiro
              </Typography>
            </div>
          </Paper>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>Data/Hora</TableCell>
                  <TableCell className={classes.tableHead}>Navio</TableCell>
                  <TableCell className={classes.tableHead}>Manobra</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rjpilots.map(i => (
                  <TableRow key={i.id}>
                    <TableCell className={classes.tableRow}>
                      {i.data_hora}
                    </TableCell>
                    <TableCell className={classes.tableRow}>
                      {i.navio}
                    </TableCell>
                    <TableCell className={classes.tableRow}>
                      {i.manobra}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      )}
    </div>
  );
}
