import React from "react";
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

const Hero = ({ details }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        {details && (
          <Card
            style={{ marginTop: 20, marginBottom: 20 }}
            className={classes.root}
            elevation={0}
          >
            <CardActionArea>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <CardMedia
                  component="img"
                  image="dof.png"
                  title={details[0].area}
                  style={{ width: 100 }}
                />
              </Grid>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  {details[0].posicao}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ textAlign: "center" }}
                >
                  {`${details[0].atualizacao}`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Hero;
