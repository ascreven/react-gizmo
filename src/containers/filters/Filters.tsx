import React, { useCallback, useEffect, useState } from "react";
import { find } from "lodash";

import List from "../../shared/list/List";
import Movies from "../../features/movies/Movies";
import Shows from "../../features/shows/Shows";
import WATCH_PROVIDERS from "../../mock/watchproviders.mock";
import {IFilters} from './filters.model';
import { Route, useLocation } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import axios from "axios";
import getMovieDBCallUrl from "../../services/movieDB.service";


function Filters() {

  const initialFilters: IFilters = {};
  const [activeFilters, setActiveFilters] = React.useState(initialFilters);
  const [genres, setGenres] = useState([]); 

  const location = useLocation();
  const path = location.pathname;

  const loadGenres = useCallback(() => {
    const genreCall = path.toString().includes("shows") ? "genre/tv/list" : "genre/movie/list";
    const url = getMovieDBCallUrl(genreCall);
    
    axios.get(url, {params: {
      language: 'en-US'
    }}).then((response: any) => {
      setGenres(response.data.genres);
    });
  }, [path]);

  useEffect(() => {
    loadGenres();
  }, [loadGenres]);

  const findGenre = (id: string) => {
    const numberId = Number(id);
    const genre: any = find(genres, ["id", numberId]);
    return genre ? genre.name : null;
  };

  const handleGenreChange = (e: any) => {
    const prevFilters = Object.assign({}, activeFilters);
    prevFilters.with_genres = e;
    setActiveFilters(prevFilters);
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
  }

  return (

    <div className="row">
      <div className="col-3">
        <List items={genres} itemId="id" displayProperty="name" title="Genres" onItemSelect={handleGenreChange}/>
        <List items={watchProviders} itemId="provider_id" displayProperty="provider_name" title="Watch Providers" onItemSelect={handleWatchProviderChange}/>
      </div>
      <div className="col-9">
        <Switch>
          <Route path="/movies">
            <h1>{activeFilters.with_genres ? findGenre(activeFilters.with_genres) : "All"} Movies on {activeFilters.with_watch_providers ? findWatchProvider(activeFilters.with_watch_providers) : "Any Watch Providers"}</h1>
            <Movies filters={activeFilters} genres={genres}></Movies>
          </Route>
          <Route path="/shows">
            <h1>{activeFilters.with_genres ? findGenre(activeFilters.with_genres) : "All"} Shows on {activeFilters.with_watch_providers ? findWatchProvider(activeFilters.with_watch_providers) : "Any Watch Providers"}</h1>
            <Shows filters={activeFilters} genres={genres}></Shows>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Filters;
