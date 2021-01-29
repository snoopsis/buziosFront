import React, { useContext, useEffect } from "react";
import vesselContext from "../../context/details/vesselContext";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import red from "@material-ui/core/colors/red";
import cyan from "@material-ui/core/colors/cyan";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import Avatar from "@material-ui/core/Avatar";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Chart from "../chart/Chart";

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
    color: orange[500],
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
    color: "#f4f4f4",
    height: "100px",
    backgroundColor: cyan[400]
  }
}));

export default function Previsao() {
  useEffect(() => {
    getBuziosWeather();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const VesselContext = useContext(vesselContext);

  const {
    getBuziosWeather,
    prevHoje,
    prevAmanha,
    prevDoisDias,
    prevTresDias,
    prevQuatroDias,
    perHoje,
    perAmanha,
    perDoisDias,
    perTresDias,
    perQuatroDias
  } = VesselContext;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper elevation={0} className={classes.tableTitle}>
          <div style={{ paddingLeft: "20px", paddingTop: "20px" }}>
            <Typography variant="body1" component="h1">
              Condições Meteorológicas
            </Typography>
          </div>
          <div
            style={{
              paddingLeft: "20px",
              paddingTop: "15px"
            }}
          >
            <Typography variant="body2" component="h2">
              Previsão de Mar e Clima no Skandi Buzios
            </Typography>
          </div>
        </Paper>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>Data</TableCell>
                <TableCell className={classes.tableHead}>Onda</TableCell>
                <TableCell className={classes.tableHead}>Helideck</TableCell>
                <TableCell className={classes.tableHead}>Clima</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prevHoje.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perHoje + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
              {prevAmanha.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perAmanha + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
              {prevDoisDias.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perDoisDias + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
              {prevTresDias.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perTresDias + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
              {prevQuatroDias.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perQuatroDias + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Chart
          prevHoje={prevHoje}
          prevAmanha={prevAmanha}
          prevTresDias={prevTresDias}
          prevQuatroDias={prevQuatroDias}
          prevDoisDias={prevDoisDias}
          perHoje={perHoje}
          perAmanha={perAmanha}
          perDoisDias={perDoisDias}
          perTresDias={perTresDias}
          perQuatroDias={perQuatroDias}
        />
      </ThemeProvider>
    </div>
  );
}
