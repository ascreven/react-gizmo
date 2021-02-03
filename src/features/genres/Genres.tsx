import React from "react";
import { find } from "lodash";

import List from "../../shared/list/List";
import Movies from "../movies/Movies";
import GENRES from "../../mock/genres.mock";

function Genres() {
  const [activeGenre, setActiveGenre] = React.useState(0);
  const genres = GENRES;

  const findGenre = (id: Number) => {

    const genre = find(genres, ["id", id]);
    return genre ? genre.name : null;
  };

  return (
    <div className="row">
      <div className="col-3">
        <List items={genres} title="Genres" onItemSelect={setActiveGenre}/>
      </div>
      <div className="col-6">
        <p>{activeGenre !== 0 ? findGenre(activeGenre) : "Movies"}</p>
        <Movies></Movies>
      </div>
    </div>
  );
}

export default Genres;
