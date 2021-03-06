import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VesselState from "./context/details/vesselState";
import Home from "./components/home/Home";
// import Footer from "./components/footer/Footer";
import Appbar from "./components/appbar/Appbar";
import Chegada from "./components/chegada/Chegada";
import Canais from "./components/tv/Canais";
import Agenda from "./components/tv/Agenda";
import Listagem from "./components/camisas/Listagem";
import Form from "./components/camisas/Form";
import Praticagem from "./components/praticagem/Praticagem";
import Manutencao from "./components/manutencao/Manutencao";
import FormTv from "./components/tv/Form";
import Teste from "./components/tv/Teste";
import Decolagens from "./components/decolagens/Decolagens";
import Previsao from "./components/previsao/Previsao";

const App = () => {
  return (
    <div>
      <Fragment>
        <VesselState>
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
              <Route exact path="/manutencao" component={Manutencao} />
              <Route exact path="/formtv" component={FormTv} />
              <Route exact path="/decolagens" component={Decolagens} />
              <Route exact path="/previsao" component={Previsao} />
              <Route exact path="/teste" component={Teste} />
            </Switch>
          </Router>
        </VesselState>
      </Fragment>
    </div>
  );
};

export default App;
