import {BrowserRouter, Route} from "react-router-dom"

import {Home} from './pages/Home';
import {PilulasMCD} from './pages/PilulasMCD';
import {TextosModacad} from './pages/TextosModacad';
import {PlanosMDC} from './pages/Planos';
import Dashboard from "./pages/Dashboard";
import { BlanckPage } from "./pages/blank";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/pilulas/:pilulaId" component={PilulasMCD} />
      <Route path="/textomodacad/:textId" component={TextosModacad} />
      <Route path="/planos" component={PlanosMDC} />
      <Route path="/dash" component={Dashboard} />
      <Route path="/blanck" exact component={BlanckPage} />
    </BrowserRouter>
  );
}

export default Routes