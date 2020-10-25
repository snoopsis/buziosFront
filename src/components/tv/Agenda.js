/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  table: {
    width: "100%"
  }
}));
export default function Canais() {
  const classes = useStyles();

  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function agenda() {
      const res = await fetch("/api/canais");
      res.json().then(res => setAgendamentos(res));
    }

    agenda();
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5">AGENDAMENTOS</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            lista de agendamentos do canal 11
          </Typography>
        </Grid>

        <Grid item xs={12} style={{ marginTop: 20, marginBottom: 20 }}>
          <Link to="/canais">
            <Button variant="contained" color="primary">
              Agendar / Book
            </Button>
          </Link>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Canal</StyledTableCell>
              <StyledTableCell align="right">Data</StyledTableCell>
              <StyledTableCell align="right">Horario</StyledTableCell>
              <StyledTableCell align="right">Numero</StyledTableCell>
              <StyledTableCell align="right">Nome</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendamentos.map(row => (
              <StyledTableRow key={row.numero}>
                <StyledTableCell component="th" scope="row">
                  {row.canal}
                </StyledTableCell>
                <StyledTableCell align="center">{row.data}</StyledTableCell>
                <StyledTableCell align="center">{row.horario}</StyledTableCell>
                <StyledTableCell align="center">{row.numero}</StyledTableCell>
                <StyledTableCell align="center">{row.nome}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
