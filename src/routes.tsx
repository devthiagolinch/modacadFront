import {BrowserRouter, Route} from "react-router-dom"

import {Home} from './pages/Home';
import {PilulasMCD} from './pages/PilulasMCD';
import {TextosModacad} from './pages/TextosModacad';
import {PlanosMDC} from './pages/Planos';
import Dashboard from "./pages/Dashboard";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/pilulas" component={PilulasMCD} />
      <Route path="/textomodacad" component={TextosModacad} />
      <Route path="/planos" component={PlanosMDC} />
      <Route path="/dash" component={Dashboard} />
    </BrowserRouter>
  );
}

export default Routes