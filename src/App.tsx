import "./App.scss";
import movies from "./mock/movies.mock";
import Card from "./shared/card/Card";
import List from "./shared/list/List";


function App() {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <Card />
        </div>
        <div className="col">
          <List items={movies} title="Movies"/>
        </div>
      </div>
    </div>
  );
}

export default App;
