
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { TextosModacad } from "../../pages/TextosModacad";
import { Home } from "../../pages/Home";

  export function AppRoutes() {
    return (
        <Router>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/textos-modacad" element={<TextosModacad/>}/>
          </Routes>
        </Router>
    )
  }