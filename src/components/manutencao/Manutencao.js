import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import FormSignup from "./FormSignup";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

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
  }
}));

export default function Manutencao({ props, submitForm }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [lista, setLista] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  useEffect(() => {
    async function agenda() {
      const res = await fetch(
        "https://api.migueldias.net/buzios/listamanutencao"
      );
      res.json().then(res => setLista(res));
    }

    agenda();
  }, []);

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
            marginBottom: 40,
            display: isSubmitted === false ? "" : "none"
          }}
          onClick={() => setIsSubmitted(true)}
        >
          Abrir Pedido
        </Button>

        {isSubmitted && <FormSignup submitForm={submitForm} />}
      </Container>

      {isSubmitted === false && (
        <div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChanges("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>CABINE 728</Typography>
              <Typography className={classes.secondaryHeading}>
                MIGUEL DIAS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lampada queimada e vazamento de agua no banheiro.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChanges("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>
                CORREDOR DECK B
              </Typography>
              <Typography className={classes.secondaryHeading}>
                JAISON JESUS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Corrimao quebrado proximo a lixeira de bombordo.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChanges("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}>REFEITORIO</Typography>
              <Typography className={classes.secondaryHeading}>
                ANTONIO SILVA
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Pe da mesa central quebrado e maquina de cafe nao liga.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  );
}
