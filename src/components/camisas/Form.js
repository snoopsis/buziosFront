/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function Form(props) {
  const [escolha, setEscolha] = useState({
    nome: "",
    empresa: "",
    funcao: "",
    tamanho: ""
  });

  const onChange = e => {
    setEscolha({ ...escolha, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    // Post Request
    axios
      .post("https://api.migueldias.net/camisas/novo", {
        nome: escolha.nome,
        empresa: escolha.empresa,
        funcao: escolha.funcao,
        tamanho: escolha.tamanho
      })
      .catch(function(error) {
        console.log(error);
      });
    props.history.push("/listagem");
    setTimeout(() => notifySuccess(), 1000);
  };

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
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5">CAMISAS SKANDI BUZIOS</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            levantamento de tamanho camisas no Buzios
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <Grid item xs={12}>
          <TextField
            label="Nome / Name"
            variant="outlined"
            name="nome"
            onChange={onChange}
            InputLabelProps={{
              shrink: true
            }}
            value={escolha.canal}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <TextField
            label="Empresa / Company"
            variant="outlined"
            name="empresa"
            onChange={onChange}
            InputLabelProps={{
              shrink: true
            }}
            value={escolha.numero}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <TextField
            label="Funcao / Funcao"
            variant="outlined"
            name="funcao"
            onChange={onChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>

        <Grid item xs={12} style={{ marginTop: 10 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tamanho da Camisa</FormLabel>
            <RadioGroup aria-label="gender" name="tamanho" onChange={onChange}>
              <FormControlLabel
                value="Pequeno"
                control={<Radio />}
                label="Pequeno / Small"
              />
              <FormControlLabel
                value="Medio"
                control={<Radio />}
                label="Medio / Medium"
              />
              <FormControlLabel
                value="Grande"
                control={<Radio />}
                label="Grande / Large"
              />
              <FormControlLabel
                value="Extra Grande"
                control={<Radio />}
                label="Extra Grande / Extra Large"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

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
    </div>
  );
}
