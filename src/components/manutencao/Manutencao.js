import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import FormSignup from "./FormSignup";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: "33.33%",
    flexShrink: 0,
    textTransform: "uppercase"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.secondary,
    textTransform: "uppercase"
  },
  formFields: {
    marginBottom: 20,
    maxWidth: "80vw",
    width: "100%"
  }
}));

export default function Manutencao() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [lista, setLista] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [final, setFinal] = useState(false);

  function submitForm() {
    setIsSubmitted(false);
    setFinal(true);
  }

  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get("https://api.migueldias.net/buzios/listamanutencao")
      .then(function(response) {
        // handle success
        setLista(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, [lista]);

  const handleChanges = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h3">SK BUZIOS</Typography>
        <Typography variant="h5" style={{ color: "#a5a2a2" }} gutterBottom>
          LOG DE MANUTENCAO
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Informe o problema encontrado para reparo. Melhor local e horário para
          manutenção.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          style={{
            marginBottom: 10,
            display: isSubmitted === false ? "" : "none"
          }}
          onClick={() => setIsSubmitted(true)}
        >
          Abrir Pedido
        </Button>

        {isSubmitted && <FormSignup submitForm={submitForm} />}
      </Container>

      <div style={{ marginBottom: 10 }}>
        {final && (
          <Alert severity="success">Pedido de Manutenção Enviado!</Alert>
        )}
      </div>

      {isSubmitted === false && (
        <div>
          {lista.map(manutencao => (
            <Accordion
              expanded={expanded === manutencao.id}
              onChange={handleChanges(manutencao.id)}
              key={manutencao.id}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>
                  {manutencao.local}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {manutencao.nome} {" | "}
                  <strong>{manutencao.data}</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{manutencao.problema}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}
