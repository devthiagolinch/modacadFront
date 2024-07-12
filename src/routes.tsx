import {BrowserRouter, Route} from "react-router-dom"

import {Home} from './pages/Home';
import {PilulasMCD} from './pages/PilulasMCD';
import {TextosModacad} from './pages/TextosModacad';
import {PlanosMDC} from './pages/Planos';
import Dashboard from "./pages/Dashboard";
import { PublishText } from "./pages/TextosPublicados";
import { TextosMaisLidos } from "./pages/TextosMaisLidos";
import { PilulasPublicadas } from "./pages/PilulasPublicadas"
import { BlanckPage } from "./pages/blank";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/pilulas/:pilulaId" component={PilulasMCD} />
      <Route path="/textomodacad/:textId" component={TextosModacad} />
      <Route path="/planos/" component={PlanosMDC} />
      <Route path="/dash/" component={Dashboard} />
      <Route path="/textospublicados" exact component={PublishText} />
      <Route path="/maislidos" exact component={TextosMaisLidos} />
      <Route path="/pilulas" exact component={PilulasPublicadas} />
      <Route path="/blank" exact component={BlanckPage} />
    </BrowserRouter>
  );
}

export default Routes