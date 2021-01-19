import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LiveTvIcon from "@material-ui/icons/LiveTv";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800]
    },
    secondary: {
      main: red[500]
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  banner: {
    width: "100%",
    minHeight: 210,
    marginBottom: 10,
    maxWidth: 500
  }
}));

function Appbar() {
  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Fragment>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <a
                  href="https://buzios.migueldias.net"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  BUZIOS
                </a>
              </Typography>
              <Link
                to="/agenda"
                style={{
                  color: "#fff",
                  textDecoration: "none"
                }}
              >
                {" "}
                <LiveTvIcon />
              </Link>
              <Link
                to="/chegada"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  marginLeft: 15
                }}
              >
                {" "}
                <HowToRegIcon />
              </Link>
            </Toolbar>
          </AppBar>
          <Toolbar />
        </Fragment>
      </ThemeProvider>
    </div>
  );
}

export default Appbar;
