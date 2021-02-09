import React from "react";
import { find } from "lodash";

import List from "../../shared/list/List";
import Movies from "../movies/Movies";
import GENRES from "../../mock/genres.mock";
import WATCH_PROVIDERS from "../../mock/watchproviders.mock";
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
    console.log(prevFilters);
  }

  const watchProviders = WATCH_PROVIDERS;

  const findWatchProvider = (id: string) => {
    const numberId = Number(id);
    const watchProvider = find(watchProviders, ["provider_id", numberId]);
    return watchProvider ? watchProvider.provider_name : null;
  };

  const handleWatchProviderChange = (e: any) => {
    const prevFilters = Object.assign({}, activeFilters);
    prevFilters.with_watch_providers = e;
    prevFilters.watch_region = "US";
    setActiveFilters(prevFilters);
    console.log(prevFilters);
  }

  return (
    <div className="row">
      <div className="col-3">
        <List items={genres} itemId="id" displayProperty="name" title="Genres" onItemSelect={handleGenreChange}/>
        <List items={watchProviders} itemId="provider_id" displayProperty="provider_name" title="Watch Providers" onItemSelect={handleWatchProviderChange}/>
      </div>
      <div className="col-9">
        <h1>{activeFilters.with_genres ? findGenre(activeFilters.with_genres) : "Movies"} on {activeFilters.with_watch_providers ? findWatchProvider(activeFilters.with_watch_providers) : "Any Watch Providers"}</h1>
        <Movies filters={activeFilters}></Movies>
      </div>
    </div>
  );
}

export default Filters;
