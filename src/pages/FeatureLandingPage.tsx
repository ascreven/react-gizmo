import axios from 'axios';
import { find } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import { IFilters } from '../containers/filters/filters.model';
import MovieDetail from '../features/movies/movie-detail/movie-detail';
import GENRES from '../mock/genres.mock';
import WATCH_PROVIDERS from '../mock/watchproviders.mock';
import getMovieDBCallUrl from '../services/movieDB.service';
import Card from '../shared/card/Card';
import List from '../shared/list/List';

function FeatureLandingPage(props: any) {
  const { page } = useParams<{ page: string }>();
  let { path } = useRouteMatch();

  const initialFilters: IFilters = {};
  const [activeFilters, setActiveFilters] = React.useState(initialFilters);

  const genres = GENRES;
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

  const [options, setOptions] = useState([]);

  const loadOptions = useCallback(
    (filters?: IFilters | undefined) => {
      const url = getMovieDBCallUrl(`discover/${page}`);
      const defaultParams = {
        include_adult: false,
        sort_by: 'popularity.desc',
        certification_country: 'US',
      };

      const params = Object.assign({}, defaultParams);

      axios.get(url, { params: params }).then((response: any) => {
        if (page === 'tv') {
          const results = formatShowTitles(response.data.results);
          setOptions(results);
        } else {
          setOptions(response.data.results);
        }
      });
    },
    [page]
  );

  useEffect(() => {
    loadOptions(props.filters);
  }, [loadOptions]);

  const formatShowTitles = (shows: any) => {
    shows.forEach((show: any) => {
      show.title = show.name;
    });
    return shows;
  };

  const findGenre = (id: string) => {
    const numberId = Number(id);
    const genre = find(genres, ["id", numberId]);
    return genre ? genre.name : null;
  };

  return (
    <div className="row">
      <div className="col-3">
        <List items={genres} itemId="id" displayProperty="name" title="Genres" onItemSelect={handleGenreChange}/>
        <List items={watchProviders} itemId="provider_id" displayProperty="provider_name" title="Watch Providers" onItemSelect={handleWatchProviderChange}/>
      </div>
      <div className="col-9">
        <div className="row">
          <div className="col-12">
        <h1>{activeFilters.with_genres ? findGenre(activeFilters.with_genres) : "Movies"} on {activeFilters.with_watch_providers ? findWatchProvider(activeFilters.with_watch_providers) : "Any Watch Providers"}</h1>
        </div>
        <Switch>
          <Route exact path={path}>
            {options.map((option: any) => (
              <div className="col-3" key={option.id}>
                <Link
                  to={{
                    pathname: `/${page}/${option.id}`,
                    state: {
                      imgSrc: option.poster_path,
                      title: option.title,
                      originalTitle: option.original_title,
                      score: option.vote_average,
                      releaseDate: option.release_date,
                      overview: option.overview,
                      video: option.video,
                      genre: findGenre(option.genre_ids[0]),
                    },
                  }}
                >
                  <Card
                    img={option.backdrop_path}
                    title={option.title}
                    score={option.vote_average}
                    genre={findGenre(option.genre_ids[0])}
                  />
                </Link>
              </div>
            ))}
          </Route>

          <Route
            path={`${page}/:id`}
            render={(routeProps: any) =>
            <MovieDetail {...routeProps} />}
          />
        </Switch>
      </div>
      </div>
      </div>
  );
}
export default FeatureLandingPage;
