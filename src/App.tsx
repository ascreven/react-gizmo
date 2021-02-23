import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';
import Filters from './containers/filters/Filters';
import Header from './layout/Header';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <div className="container-fluid">
          <Filters />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
