import React, { useContext, useEffect } from "react";
import vesselContext from "../../context/details/vesselContext";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

export default function Hero() {
  useEffect(() => {
    getVesselDetails();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  const VesselContext = useContext(vesselContext);

  const { getVesselDetails, detalhes, prevHoje } = VesselContext;

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginBottom: -20 }}
      >
        {detalhes.length !== 0 && (
          <Card className={classes.root} elevation={0}>
            <CardActionArea>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <CardMedia
                  component="img"
                  image={
                    prevHoje.map(i => i.prev)[0] === "Favoravel"
                      ? "https://imagens.migueldias.net/bomtempo.png"
                      : "https://imagens.migueldias.net/mautempo.jpeg"
                  }
                  title={detalhes[0].area}
                />
              </Grid>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  Posição {detalhes[0].posicao}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ textAlign: "center", marginBottom: 15 }}
                >
                  Atualizado em {`${detalhes[0].atualizacao}`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      </Grid>
    </React.Fragment>
  );
}
