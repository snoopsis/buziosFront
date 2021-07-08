import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Voos from "../voos/Voos";
import Hero from "../hero/Hero";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Footer from "../footer/Footer";

const useStyles = makeStyles({
  container: {
    display: "grid",
    justifyContent: "center"
  }
});

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Hero />
      <Voos />
      <Link to="/previsao" style={{ textDecoration: "none" }}>
        <Paper
          elevation={0}
          style={{
            fontWeight: "100",

            color: "#f4f4f4",
            height: "100px",
            backgroundColor: "#4f5b62",
            textAlign: "center"
          }}
        >
          <Typography
            variant="body1"
            component="h1"
            style={{ padding: 15, textTransform: "uppercase" }}
          >
            Condições Meteorológicas
          </Typography>

          <Typography variant="body2" component="h2">
            Previsão de Mar e Clima no Skandi Buzios
          </Typography>
        </Paper>
      </Link>
      {/* <Link to="/decolagens" style={{ textDecoration: "none" }}>
        <Paper
          elevation={0}
          style={{
            fontWeight: "100",
            marginTop: 20,
            color: "#f4f4f4",
            height: "100px",
            backgroundColor: "#cfd8dc",
            textAlign: "center"
          }}
        >
          <Typography
            variant="body1"
            component="h1"
            style={{
              padding: 15,
              textTransform: "uppercase",
              color: "#000",
              fontWeight: 400
            }}
          >
            Decolagens em Tempo Real
          </Typography>

          <Typography variant="body1" style={{ color: "#000" }}>
            Todos os Voos Programados no SITAER
          </Typography>
        </Paper>
      </Link> */}

      <Link to="/praticagem" style={{ textDecoration: "none" }}>
        <Paper
          elevation={0}
          style={{
            fontWeight: "100",
            marginTop: 20,
            color: "#fff",
            height: "100px",
            backgroundColor: "#212121",
            textAlign: "center"
          }}
        >
          <Typography
            variant="body1"
            component="h1"
            style={{ padding: 15, textTransform: "uppercase" }}
          >
            Praticagem Rio / RJ Pilots
          </Typography>

          <Typography variant="body2" component="h2">
            Programacao da Praticagem Rio de Janeiro
          </Typography>
        </Paper>
      </Link>
      <Footer />
    </div>
  );
};

export default Home;
