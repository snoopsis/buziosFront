import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Appbar from "./components/appbar/Appbar";
import Chegada from "./components/chegada/Chegada";
import Canais from "./components/tv/Canais";
import Agenda from "./components/tv/Agenda";

function App() {
  return (
    <div>
      <Fragment>
        <Router>
          <Appbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/chegada" component={Chegada} />
            <Route exact path="/canais" component={Canais} />
            <Route exact path="/agenda" component={Agenda} />
          </Switch>
        </Router>
        <Footer />
      </Fragment>
    </div>
  );
}

export default App;
