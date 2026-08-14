import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Topics from "./pages/Topics";
import Companies from "./pages/Companies";

function App(){

 return(

  <BrowserRouter>

   <Routes>

    <Route
      path="/"
      element={<Dashboard />}
    />

    <Route
      path="/problems"
      element={<Problems />}
    />

    <Route
      path="/topics"
      element={<Topics />}
    />

    <Route
      path="/companies"
      element={<Companies />}
    />

   </Routes>

  </BrowserRouter>
 );
}

export default App;