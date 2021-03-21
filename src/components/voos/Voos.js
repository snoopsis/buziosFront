import React, { useEffect, useContext, useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import vesselContext from "../../context/details/vesselContext";

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  card: {
    marginTop: 20,

    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  empresa: {
    backgroundColor: "#fff"
  },
  decolagem: {
    height: 35,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: red[600],
    color: "white"
  },
  eta: {
    height: 35,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: grey[900],
    color: "white"
  }
});

export default function Voos() {
  useEffect(() => {
    getBuziosWeather();
    getVoosBuzios();
    setInterval(() => getVoosBuzios(), 15000);
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const VesselContext = useContext(vesselContext);

  const { getBuziosWeather, getVoosBuzios, voosBuzios } = VesselContext;

  const handleChanges = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const voosDeHoje = voosBuzios.filter(
    i => i.data === moment().format("DD/MM/YYYY")
  );

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginBottom: 20 }}
      >
        {voosDeHoje.map(i => (
          <Grid item xs={12} key={i.id}>
            <Accordion
              expanded={expanded === i.id}
              onChange={handleChanges(i.id)}
              key={i.id}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>{i.data}</Typography>
                <Typography className={classes.secondaryHeading}>
                  {" - "}
                  {i.horario}
                  <strong>
                    {" - "}
                    {i.prefixo}
                  </strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {i.procedencia}
                  {" / "}
                  {i.modelo} {" / "} {i.empresa_tt}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
