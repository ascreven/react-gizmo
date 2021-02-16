import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home";
import Movies from "./features/movies/Movies";
import Shows from "./features/shows/Shows";
import Header from "./layout/Header";
import Filters from "./features/filters/Filters";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/shows">
            <Shows />
          </Route>
          <Route path="/genres">
            <Filters />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
