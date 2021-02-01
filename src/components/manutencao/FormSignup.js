import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import validate from "./validateInfo";
import useForm from "./useForm";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft: 30
  },
  formFields: {
    marginBottom: 20,
    maxWidth: "80vw",
    width: "100%"
  },
  alert: {
    marginBottom: 20
  }
}));

const FormSignup = ({ submitForm }) => {
  const classes = useStyles();
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        {errors.ultimoNome && (
          <Alert severity="error" className={classes.alert}>
            {errors.primeiroNome}
          </Alert>
        )}

        <TextField
          label="Primeiro Nome / First Name"
          variant="outlined"
          name="primeiroNome"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.formFields}
          value={values.primeiroNome}
        />
        {errors.ultimoNome && (
          <Alert severity="error" className={classes.alert}>
            {errors.ultimoNome}
          </Alert>
        )}

        <TextField
          label="Ultimo Nome / Last Name"
          variant="outlined"
          name="ultimoNome"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.formFields}
          value={values.ultimoNome}
        />
        {errors.ultimoNome && (
          <Alert severity="error" className={classes.alert}>
            {errors.local}
          </Alert>
        )}

        <TextField
          label="Local / Place"
          variant="outlined"
          name="local"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.formFields}
          value={values.local}
        />
        {errors.ultimoNome && (
          <Alert severity="error" className={classes.alert}>
            {errors.horario}
          </Alert>
        )}

        <TextField
          label="Melhor Horario / Best Time to Fix"
          variant="outlined"
          name="horario"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          className={classes.formFields}
          value={values.horario}
        />
        {errors.ultimoNome && (
          <Alert severity="error" className={classes.alert}>
            {errors.problema}
          </Alert>
        )}

        <TextField
          label="Problema / Problem"
          variant="outlined"
          name="problema"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true
          }}
          multiline
          rows={4}
          className={classes.formFields}
          value={values.problema}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: 10 }}
          type="submit"
        >
          Enviar / Send
        </Button>
      </form>
    </React.Fragment>
  );
};

export default FormSignup;
