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
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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
      width: "40ch"
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
      const res = await fetch("https://api.migueldias.net/buzios/canais");
      res.json().then(res => setAgendamentos(res));
    }

    agenda();
  }, [agendamentos]);

  return (
    <div style={{ marginBottom: 20 }}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4">AGENDAMENTOS</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          AGENDAMENTO DO CANAL 11
        </Typography>

        <Link to="/canais" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 30, marginBottom: 30 }}
          >
            Agendar / Book
          </Button>
        </Link>

        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Canal</StyledTableCell>
                <StyledTableCell align="center">Data</StyledTableCell>
                <StyledTableCell align="center">Horario</StyledTableCell>
                <StyledTableCell align="center">Programa</StyledTableCell>
                <StyledTableCell align="center">Numero</StyledTableCell>
                <StyledTableCell align="center">Nome</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agendamentos.map(row => (
                <StyledTableRow key={Math.floor(Math.random() * 9000) + 1}>
                  <StyledTableCell component="th" scope="row">
                    {row.canal}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.data}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.horario}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.programa}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.numero}</StyledTableCell>
                  <StyledTableCell align="center">{row.nome}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
