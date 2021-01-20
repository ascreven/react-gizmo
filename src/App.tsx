import React from "react";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import MovieDetail from "./movies/movie-detail/movie-detail";

import "./App.scss";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:id" >
          <MovieDetail  />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
