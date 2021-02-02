import useFetch from "../../hooks/useFetch";
import List from "../../shared/list/List";
import Spinner from "../../shared/Spinner";
import MOVIES from "../../mock/movies.mock";
import React from "react";
import Movies from "../movies/Movies";
import { find } from "lodash";
import GENRES from "../../mock/genres.mock";

function Genres() {
  const [activeGenre, setActiveGenre] = React.useState(0);
  const genres = GENRES;

  const findGenre = (id: Number) => {

    const genre = find(genres, ["id", id]);
    return genre ? genre.name : null;
  };

  const getGenreMovies = (id: Number) => {
    // const genre = find(GENRES, ["id", id]);
    console.log(id);
    return MOVIES;
  };

  return (
    <div className="row">
      <div className="col-3">
        <List items={genres} title="Genres" onItemSelect={setActiveGenre}/>
      </div>
      <div className="col-6">
        <p>{activeGenre != 0 ? findGenre(activeGenre) : "Movies"}</p>
        <Movies></Movies>
      </div>
    </div>
  );
}

export default Genres;
