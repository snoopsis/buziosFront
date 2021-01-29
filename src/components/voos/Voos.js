import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
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
  },
  distancia: {
    marginBottom: 20
  }
});

export default function Voos() {
  useEffect(() => {
    getBuziosWeather();
    getVoosBuzios();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const VesselContext = useContext(vesselContext);

  const {
    getBuziosWeather,
    weather,
    diaHoje,
    getVoosBuzios,
    voosBuzios
  } = VesselContext;

  const prevHoje = weather.filter(i => i.data === diaHoje);

  const ondaHoje = prevHoje.map(i => i.onda);
  const ondaString = ondaHoje.toString();
  const ondaReduz = ondaString.substr(0, 3);
  const ondaFloat = parseFloat(ondaReduz);

  return (
    <React.Fragment>
      <Grid
        spacing={2}
        container
        justify="center"
        alignItems="center"
        style={{ backgroundColor: "#37474f", marginBottom: 20 }}
      >
        {voosBuzios.map(i => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={i.id}
            style={{ marginTop: 30, marginBottom: 30 }}
          >
            <Card>
              <CardContent>
                <div className={classes.empresa} variant="square">
                  <img
                    src={"https://www.tusas.com/uploads/yapisal-10.png"}
                    alt="Companhia Aerea"
                    style={{
                      backgroundColor: "#fff",
                      width: 80
                    }}
                  />
                  <img
                    src={
                      i.tempoAero
                        ? i.tempoAero
                        : "https://www.windy.com/img/icons5/png_25px/1_night_7.png"
                    }
                    alt="Clima em Jacarepagua"
                    style={{ float: "right" }}
                  />
                </div>
                <Chip
                  label={i.modelo}
                  color="primary"
                  variant="outlined"
                  size="small"
                />

                <Box align="center">
                  <Typography variant="h5" component="h2">
                    {i.horario}
                  </Typography>
                  <Typography color="textSecondary">{i.prefixo}</Typography>
                  <Typography variant="subtitle2">{i.numero}</Typography>
                </Box>

                <Grid container justify="center" style={{ marginTop: 10 }}>
                  <Grid item>
                    <Chip label={i.procedencia} color="default" />
                  </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: 10 }}>
                  <Grid item>
                    <Chip label={i.obs} color="primary" />
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid item style={{ marginTop: 10 }}>
                    <Box align="right" className={classes.corpoMensagem}>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ textAlign: "center", marginBottom: 10 }}
                      >
                        Briefing Buzios Previsto {i.horario}
                        {i.saida_aero.length > 0 && ondaFloat < 2 && (
                          <Typography
                            variant="body2"
                            style={{ textAlign: "center" }}
                          >
                            Confirmar horario de Decolagem com a Sala de Radio.
                            Em alguns casos o Prefixo da Aeronave pode mudar e o
                            horario nao estar certo.
                          </Typography>
                        )}
                        {ondaFloat < 2 && i.saida_aero.length === 0 && (
                          <Typography
                            variant="body2"
                            style={{ textAlign: "center" }}
                          >
                            Assim que a Aeronave Decolar será informado Horário
                            e ETA.{" "}
                          </Typography>
                        )}
                        {ondaFloat > 2 && (
                          <Typography
                            variant="body2"
                            style={{ textAlign: "center" }}
                          >
                            As condições de mar estão oscilando ou fora do
                            limite para atendimento de Aeronave. O horário do
                            voo pode mudar ou ser transferido para amanhã.
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                    {i.saida_aero.length > 0 && ondaFloat < 2 && (
                      <Grid item>
                        <Paper elevation={3} className={classes.decolagem}>
                          <Typography variant="h6">
                            Decolado as {i.saida_aero}
                          </Typography>
                        </Paper>
                      </Grid>
                    )}
                    {i.eta.length > 0 && ondaFloat < 2 && (
                      <Grid item>
                        <Paper elevation={3} className={classes.eta}>
                          <Typography variant="h6">ETA as {i.eta}</Typography>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
