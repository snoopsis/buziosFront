/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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

  const [escolha, setEscolha] = useState({
    procurar: "",
    canal: "",
    numero: "",
    nome: "",
    horario: "",
    programa: ""
  });

  const [form, setForm] = useState(false);

  const onChange = e => {
    setEscolha({ ...escolha, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    // Post Request
    axios
      .post("/novoCanal", {
        canal: escolha.canal,
        numero: escolha.numero,
        nome: escolha.nome,
        horario: escolha.horario,
        programa: escolha.programa,
        data: escolha.data
      })
      .catch(function(error) {
        console.log(error);
      });
    setForm(false);
    props.history.push("/agenda");
    setTimeout(() => notifySuccess(), 1000);
  };

  const pegaCanal = canal => {
    setEscolha({
      canal: canal.canal,
      numero: canal.numero
    });
    setForm(true);
  };

  function filtrar() {
    const regex = new RegExp(escolha.procurar, "gi");
    return lista.filter(item => item.canal.match(regex));
  }

  const notifySuccess = () =>
    toast.success("Pedido de canal enviado! Obrigado.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {form === false && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Card
            style={{ marginBottom: 10 }}
            className={classes.root}
            elevation={0}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5">AGENDAMENTO</Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                  Selecione o seu canal
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <TextField
            label="Procurar canal..."
            variant="outlined"
            name="procurar"
            onChange={onChange}
            style={{ width: "100%", marginBottom: 20 }}
          />
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
                        to="/canais"
                        onClick={() =>
                          pegaCanal({ canal: row.canal, numero: row.numero })
                        }
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
      {form === true && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <Button
            variant="contained"
            color="default"
            style={{ marginBottom: 20 }}
            onClick={() => setForm(false)}
          >
            Voltar
          </Button>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              label="Canal / Channel"
              variant="outlined"
              name="canal"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
              value={escolha.canal}
            />
            <TextField
              label="Numero / Number"
              variant="outlined"
              name="numero"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
              value={escolha.numero}
            />
            <TextField
              label="Nome / Name"
              variant="outlined"
              name="nome"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Data / Date"
              variant="outlined"
              name="data"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Horario / Time"
              variant="outlined"
              name="horario"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Programa / Tv Show"
              variant="outlined"
              name="programa"
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
            onClick={() => {
              onSubmit();
              notifySuccess();
            }}
            type="submit"
          >
            Enviar / Send
          </Button>
        </Grid>
      )}
    </div>
  );
}
