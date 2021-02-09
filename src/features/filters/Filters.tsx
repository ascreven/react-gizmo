import React from "react";
import { find } from "lodash";

import List from "../../shared/list/List";
import Movies from "../movies/Movies";
import GENRES from "../../mock/genres.mock";
import {IFilters} from './filters.model';


function Filters() {

  const initialFilters: IFilters = {};
  const [activeFilters, setActiveFilters] = React.useState(initialFilters);
  const genres = GENRES;

  const findGenre = (id: string) => {
    const numberId = Number(id);
    const genre = find(genres, ["id", numberId]);
    return genre ? genre.name : null;
  };

  const handleGenreChange = (e: any) => {
    const prevFilters = Object.assign({}, activeFilters);
    prevFilters.with_genres = e;
    setActiveFilters(prevFilters);
  }

  return (
    <div className="row">
      <div className="col-3">
        <List items={genres} title="Genres" onItemSelect={handleGenreChange}/>
      </div>
      <div className="col-9">
        <h1>{activeFilters.with_genres ? findGenre(activeFilters.with_genres) : "Movies"}</h1>
        <Movies filters={activeFilters}></Movies>
      </div>
    </div>
  );
}

export default Filters;
