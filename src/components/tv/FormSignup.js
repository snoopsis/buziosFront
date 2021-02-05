import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
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
    marginBottom: 20
  },
  alert: {
    marginBottom: 20,
    marginTop: 20
  }
}));

const FormSignup = ({ submitForm, setForm, escolha }) => {
  const classes = useStyles();
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate,
    escolha
  );

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 10, marginBottom: 10, textAlign: "center" }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="default"
            style={{ marginBottom: 30 }}
            onClick={() => setForm(false)}
          >
            Voltar
          </Button>
        </Grid>
        <form
          className={classes.root}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Grid item className={classes.formFields}>
            <TextField
              label="Canal / Channel"
              variant="outlined"
              name="canal"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true
              }}
              value={escolha.canal}
            />
          </Grid>
          <Grid item className={classes.formFields}>
            <TextField
              label="Numero / Number"
              variant="outlined"
              name="numero"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true
              }}
              value={escolha.numero}
            />
            {errors.nome && (
              <Alert severity="error" className={classes.alert}>
                {errors.nome}
              </Alert>
            )}
          </Grid>
          <Grid item className={classes.formFields}>
            <TextField
              label="Nome / Name"
              variant="outlined"
              name="nome"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true
              }}
              value={values.nome}
            />
            {errors.data && (
              <Alert severity="error" className={classes.alert}>
                {errors.data}
              </Alert>
            )}
          </Grid>
          <Grid item className={classes.formFields}>
            <TextField
              label="Data / Date"
              variant="outlined"
              name="data"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true
              }}
              value={values.data}
            />
            {errors.horario && (
              <Alert severity="error" className={classes.alert}>
                {errors.horario}
              </Alert>
            )}
          </Grid>
          <Grid item className={classes.formFields}>
            <TextField
              label="Horario / Time"
              variant="outlined"
              name="horario"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true
              }}
              value={values.horario}
            />
            {errors.programa && (
              <Alert severity="error" className={classes.alert}>
                {errors.programa}
              </Alert>
            )}
          </Grid>
          <Grid item className={classes.formFields}>
            <TextField
              label="Programa / Tv Show"
              variant="outlined"
              name="programa"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true
              }}
              value={values.programa}
            />
          </Grid>
          <Grid item className={classes.formFields}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
              type="submit"
            >
              Enviar / Send
            </Button>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default FormSignup;
