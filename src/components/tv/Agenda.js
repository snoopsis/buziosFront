/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import Container from "@material-ui/core/Container";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch"
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    textTransform: "uppercase"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
    textTransform: "uppercase"
  }
}));
export default function Agenda() {
  const classes = useStyles();

  const [agendamentos, setAgendamentos] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleChanges = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    axios
      .get("https://api.migueldias.net/buzios/canais")
      .then(function(response) {
        // handle success
        setAgendamentos(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
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

        {agendamentos.map(agenda => (
          <Accordion
            expanded={expanded === agenda.id}
            onChange={handleChanges(agenda.id)}
            key={agenda.id}
            style={{ textAlign: "center" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                {agenda.data.slice(0, 5)}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                Canal: {agenda.numero} {" | "}
                <strong>{agenda.horario}</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Programa:</strong> {agenda.programa} |{" "}
                <strong>Canal:</strong>
                {agenda.canal} | <strong>Tripulante: </strong>
                {agenda.nome}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </div>
  );
}
