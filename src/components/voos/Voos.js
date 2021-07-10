import React, { useEffect, useContext, useState } from "react";
import moment from "moment";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import vesselContext from "../../context/details/vesselContext";

// const useStyles = makeStyles({
//   root: {
//     display: "flex"
//   }
// });

export default function Voos() {
  useEffect(() => {
    getBuziosWeather();
    getVoosBuzios();
    setInterval(() => getVoosBuzios(), 15000);
    // eslint-disable-next-line
  }, []);

  const [expanded, setExpanded] = useState(false);

  const VesselContext = useContext(vesselContext);

  const { getBuziosWeather, getVoosBuzios, voosBuzios } = VesselContext;

  const handleChanges = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const voosDeHoje = voosBuzios.filter(
    i =>
      (i.decolagem.length === 0 && i.data === moment().format("DD/MM/YYYY")) ||
      (i.decolagem.length === 0 &&
        i.data ===
          moment()
            .add(+1, "days")
            .format("DD/MM/YYYY")) ||
      (i.decolagem.length === 0 &&
        i.data ===
          moment()
            .add(+2, "days")
            .format("DD/MM/YYYY")) ||
      (i.decolagem.length === 0 &&
        i.data ===
          moment()
            .add(+3, "days")
            .format("DD/MM/YYYY")) ||
      (i.decolagem.length === 0 &&
        i.data ===
          moment()
            .add(+4, "days")
            .format("DD/MM/YYYY")) ||
      (i.decolagem.length === 0 &&
        i.data ===
          moment()
            .add(-1, "days")
            .format("DD/MM/YYYY"))
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
          <Grid
            item
            xs={12}
            key={i.id}
            style={{ textAlign: "center", marginBottom: 10 }}
          >
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
                <Typography>{i.data.slice(0, 5)}</Typography>

                <Typography style={{ marginLeft: 5 }}>
                  {" "}
                  <strong>{i.horario}</strong>
                </Typography>
                <Typography
                  style={{ fontSize: "12px", marginTop: 3, marginLeft: 5 }}
                >
                  {i.procedencia}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {" | "}
                  {i.modelo} {" | "} {i.empresa_tt} {" | "} {i.prefixo}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
