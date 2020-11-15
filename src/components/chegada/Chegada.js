import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Dados Pessoais / Personal Details",
    "Contato de Emergencia / Next of Kin",
    "Enviar / Send",
  ];
}

export default function VerticalLinearStepper(props) {
  var classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    nacionalidade: "",
    cpf: "",
    nascimento: "",
    email: "",
    celular: "",
    genero: "",
    funcao: "",
    nok_nome: "",
    nok_cel: "",
  });
  const steps = getSteps();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    axios
      .post("/buzios/novoMembro", {
        nome: form.nome,
        empresa: form.empresa,
        nacionalidade: form.nacionalidade + " nascido em " + form.local_nasc,
        cpf: form.cpf,
        nascimento: form.nascimento,
        email: form.email,
        celular: form.celular,
        genero: form.genero,
        funcao: form.funcao,
        nok_nome: form.nok_nome,
        nok_cel: form.nok_cel,
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    props.history.push("/");
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <form className={classes.root} noValidate autoComplete="off">
              <Typography variant="body1" gutterBottom>
                Bem vindo, por favor preencha os dados abaixo / Welcome please
                fill the information below
              </Typography>

              <TextField
                label="Nome Completo/Full Name"
                variant="outlined"
                name="nome"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Empresa / Company"
                variant="outlined"
                name="empresa"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Nacionalidade / Country"
                variant="outlined"
                name="nacionalidade"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Local Nascimento/Place Birth"
                variant="outlined"
                name="local_nasc"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="CPF / Passport"
                variant="outlined"
                name="cpf"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Data Nascimento / Birth Date"
                variant="outlined"
                name="nascimento"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-basic"
                label="Celular / Cellphone"
                variant="outlined"
                onChange={onChange}
                name="celular"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Genero / Gender"
                variant="outlined"
                name="genero"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>
              <TextField
                label="Função / Rank"
                variant="outlined"
                name="funcao"
                onChange={onChange}
              />
            </form>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                label="Nome / Name"
                variant="outlined"
                name="nok_nome"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Celular / Phone"
                variant="outlined"
                name="nok_cel"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Typography variant="body2">
              <strong>Nome / Name: </strong>
              {form.nome}
            </Typography>
            <br />
            <Typography variant="body2">
              <strong>Nacionalidade / Country: </strong>
              {form.nacionalidade + " nascido em " + form.local_nasc}
            </Typography>
            <br />
            <Typography variant="body2">
              <strong>CPF / PASSPORT: </strong>
              {form.cpf}
            </Typography>
            <br />
            <Typography variant="body2">
              <strong>Data Nascimento / DOB: </strong>
              {form.nascimento}
            </Typography>
            <br />
            <Typography variant="body2">
              <strong>Email: </strong>
              {form.email}
            </Typography>
            <br />
            <Typography variant="body2">
              <strong>Genero / Gender: </strong>
              {form.genero}
            </Typography>
            <br />
            <Typography variant="body2">
              <strong>Funcao / Rank: </strong>
              {form.funcao}
            </Typography>
            <br />
            <Typography variant="body2">
              <strong>NOK Nome / Name: </strong>
              {form.nok_nome}
            </Typography>
            <br />
            <Typography variant="body2">
              <strong>NOK Telefone / Contact: </strong>
              {form.nok_cel}
            </Typography>
            <br />
          </React.Fragment>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <React.Fragment>
      {activeStep === 3 && onSubmit()}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div>{getStepContent(index)}</div>{" "}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Voltar / Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? "Terminar / Finish"
                      : "Proximo / Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            Formulario Completo e Enviado - Obrigado! <br />
            <br />
            Form Completed and Sent - Thanks
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Voltar
          </Button>
        </Paper>
      )}
    </React.Fragment>
  );
}
