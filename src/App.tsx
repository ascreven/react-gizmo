import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';
import Header from './layout/Header';
import Home from './pages/Home';
import FeatureLandingPage from './pages/FeatureLandingPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <div className="container-fluid">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/:page" children={<FeatureLandingPage />} />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
