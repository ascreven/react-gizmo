import React from "react";
import "./App.scss";
import movies from "./mock/movies.mock";
import genres from "./mock/genres.mock";
import Card from "./shared/card/Card";
import List from "./shared/list/List";
import {find} from "lodash";


function App() {
  const findGenre = (id:  Number) => {
    const genre = find(genres, ['id', id]);
    return genre ? genre.name : null;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {movies.map((movie: any) => (
          <div className="col-3">
            <Card title={movie.title} score={movie.vote_average} genre={findGenre(movie.genre_ids[0])} />
          </div>
        ))}
        <div className="col">
          <List items={genres} title="Genres"/>
        </div>
      </div>
    </div>
  );
}

export default App;
