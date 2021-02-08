/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Container from "@material-ui/core/Container";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import lista from "./lista";

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
export default function Canais(props) {
  const classes = useStyles();

  const [form, setForm] = useState(false);
  const [escolha, setEscolha] = useState({
    procurar: ""
  });

  const onChange = e => {
    const { name, value } = e.target;
    setEscolha({
      ...escolha,
      [name]: value
    });
  };

  // Pega o nome do canal pelo map(row)
  const pegaCanal = () => {
    setForm(true);
  };

  // Filtra os resultados de acordo com o que se coloca
  // na Busca e retorna os valores
  function filtrar() {
    const regex = new RegExp(escolha.procurar, "gi");
    return lista.filter(item => item.canal.match(regex));
  }

  return (
    <div>
      {form === false && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Container>
              <Typography
                variant="h5"
                style={{ marginBottom: 15, marginTop: 10 }}
              >
                AGENDAMENTO / BOOKING
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ textAlign: "center", marginBottom: 20 }}
              >
                Selecione o seu canal / Choose Channel
              </Typography>
            </Container>
          </Grid>

          <Grid item xs={12}>
            <Container>
              <TextField
                label="Procurar / Search..."
                variant="outlined"
                name="procurar"
                onChange={onChange}
                style={{ width: "100%", marginBottom: 20 }}
              />
            </Container>
          </Grid>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Canal</StyledTableCell>
                  <StyledTableCell align="right">Numero</StyledTableCell>
                  <StyledTableCell align="right">Escolha</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtrar().map(row => (
                  <StyledTableRow key={row.numero}>
                    <StyledTableCell component="th" scope="row">
                      {row.canal}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.numero}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Link
                        to={{
                          pathname: "/formtv",
                          state: {
                            canal: row.canal,
                            numero: row.numero
                          }
                        }}
                        onClick={pegaCanal}
                      >
                        <AssignmentTurnedInOutlinedIcon
                          style={{ color: "#388e3c" }}
                        />
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </div>
  );
}
