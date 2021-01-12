import React from "react";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id">
          <MovieComponent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function MovieComponent() {
  return <div>MOVIE PAGE</div>;
}

export default App;
