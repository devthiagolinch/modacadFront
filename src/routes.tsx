import {BrowserRouter, Route} from "react-router-dom"

import {Home} from './pages/Home';
import {PilulasMCD} from './pages/PilulasMCD';
import {TextosModacad} from './pages/TextosModacad';
import {PlanosMDC} from './pages/Planos';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/pilulas" component={PilulasMCD} />
      <Route path="/textomodacad" component={TextosModacad} />
      <Route path="/planos" component={PlanosMDC} />
    </BrowserRouter>
  );
}

export default Routes