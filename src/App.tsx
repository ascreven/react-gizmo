import "./App.scss";
import movies from "./mock/movies.mock";
import Card from "./shared/Card";
import List from "./shared/List";


function App() {

  return (
    <div className="container-fluid">
      <List items={movies} title="Movies"/>
      <Card />
    </div>
  );
}

export default App;
