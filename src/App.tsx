import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.scss";
import Header from "./layout/Header";
import Home from "./pages/Home";
import FeatureLandingPage from "./pages/FeatureLandingPage";
import { ROUTES } from "./routes";
import { IRoute } from "./models/route.model";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <div className="container-fluid">
          <Route exact path="/">
            <Home />
          </Route>
          {ROUTES.map((staticRoute: IRoute, index: number) => (
            <Route
              path={staticRoute.path}
              render={() => (
                <FeatureLandingPage
                  title={staticRoute.title}
                  movieDbKey={staticRoute.key}
                />
              )}
            />
          ))}
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
