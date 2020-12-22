import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Appbar from "./components/appbar/Appbar";
import Chegada from "./components/chegada/Chegada";
import Canais from "./components/tv/Canais";
import Agenda from "./components/tv/Agenda";
import Listagem from "./components/camisas/Listagem";
import Form from "./components/camisas/Form";
import Praticagem from "./components/praticagem/Praticagem";

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
            <Route exact path="/listagem" component={Listagem} />
            <Route exact path="/form" component={Form} />
            <Route exact path="/praticagem" component={Praticagem} />
          </Switch>
        </Router>
        <Footer />
      </Fragment>
    </div>
  );
}

export default App;
