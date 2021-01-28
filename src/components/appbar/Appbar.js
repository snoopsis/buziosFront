import React, { Fragment } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import DirectionsBoat from "@material-ui/icons/DirectionsBoat";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import Menu from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

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
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

export default function Appbar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List style={{ backgroundColor: "#37474f" }}>
        <ListItem>
          <ListItemIcon>
            <DirectionsBoat style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "#fff" }}>Skandi Buzios</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <Link
          to="/"
          style={{
            color: "#000",
            textDecoration: "none"
          }}
        >
          <ListItem>
            <ListItemIcon>
              <FlightTakeoffIcon />
            </ListItemIcon>
            <ListItemText style={{ marginTop: 11 }}>
              Voos Metereologia
            </ListItemText>
          </ListItem>
        </Link>
        <Link
          to="/agenda"
          style={{
            color: "#000",
            textDecoration: "none"
          }}
        >
          <ListItem>
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText style={{ marginTop: 11 }}>
              Agendamento Canal
            </ListItemText>
          </ListItem>
        </Link>
        <Link
          to="/chegada"
          style={{
            color: "#000",
            textDecoration: "none"
          }}
        >
          <ListItem>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText style={{ marginTop: 11 }}>
              Cadastro de Chegada
            </ListItemText>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Fragment>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                <Menu onClick={toggleDrawer("left", true)} />
              </Typography>

              <Drawer
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                anchor={"left"}
              >
                {list("Left")}
              </Drawer>

              {/* <Link
                to="/chegada"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  marginLeft: 15
                }}
              >
                {" "}
                <HowToRegIcon />
              </Link> */}
            </Toolbar>
          </AppBar>
          <Toolbar />
        </Fragment>
      </ThemeProvider>
    </div>
  );
}
