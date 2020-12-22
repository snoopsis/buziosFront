/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
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
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

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
export default function Listagem() {
  const classes = useStyles();

  const [lista, setLista] = useState([]);

  useEffect(() => {
    async function agenda() {
      const res = await fetch("https://api.migueldias.net/camisas/lista");
      res.json().then(res => setLista(res));
    }

    agenda();
  }, [lista]);

  const pequeno = lista.filter(i => i.tamanho === "Pequeno");
  const medio = lista.filter(i => i.tamanho === "Medio");
  const grande = lista.filter(i => i.tamanho === "Grande");
  const extra = lista.filter(i => i.tamanho === "Extra Grande");

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 20 }}
      >
        <Grid item style={{ textAlign: "center" }}>
          <Typography variant="h5">Obrigado!</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Seu nome ja esta na listagem.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 20 }}
      >
        <Grid item>
          <Chip
            avatar={<Avatar>{pequeno.length}</Avatar>}
            label="Pequeno"
            clickable
            color="primary"
            style={{ marginLeft: 10, marginBottom: 10 }}
          />
        </Grid>
        <Grid item>
          <Chip
            avatar={<Avatar>{medio.length}</Avatar>}
            label="Medio"
            clickable
            color="primary"
            style={{
              marginLeft: 10,
              marginBottom: 10
            }}
          />
        </Grid>
        <Grid item>
          <Chip
            avatar={<Avatar>{grande.length}</Avatar>}
            label="Grande"
            clickable
            color="primary"
            style={{ marginLeft: 10, marginBottom: 10 }}
          />
        </Grid>
        <Grid item>
          <Chip
            avatar={<Avatar>{extra.length}</Avatar>}
            label="Extra Grande"
            clickable
            color="primary"
            style={{ marginLeft: 10, marginBottom: 10 }}
          />
        </Grid>
        <Grid item>
          <Chip
            avatar={<Avatar>{lista.length}</Avatar>}
            label="Total"
            clickable
            color="secondary"
            style={{ marginLeft: 10, marginBottom: 10 }}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell align="center">Empresa</StyledTableCell>
              <StyledTableCell align="center">Funcao</StyledTableCell>
              <StyledTableCell align="center">Tamanho</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lista.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.nome}
                </StyledTableCell>
                <StyledTableCell align="center">{row.empresa}</StyledTableCell>
                <StyledTableCell align="center">{row.funcao}</StyledTableCell>
                <StyledTableCell align="center">{row.tamanho}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
