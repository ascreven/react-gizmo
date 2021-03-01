import axios from "axios";
import { find, merge } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";

import { IFilters } from "../containers/filters/filters.model";
import MovieDetail from "../features/movies/movie-detail/movie-detail";
import GENRES from "../mock/genres.mock";
import WATCH_PROVIDERS from "../mock/watchproviders.mock";
import getMovieDBCallUrl from "../services/movieDB.service";
import Card from "../shared/card/Card";
import List from "../shared/list/List";

type Props = {
  movieDbKey: string;
  title: string;
};

function FeatureLandingPage(props: Props) {
  const { movieDbKey, title } = props;

  const initialFilters: IFilters = {};
  const [activeFilters, setActiveFilters] = React.useState(initialFilters);

  const genres = GENRES;
  const handleGenreChange = (e: any) => {
    const filters = Object.assign({}, activeFilters);
    filters.with_genres = e;
    setActiveFilters(filters);
  };

  const watchProviders = WATCH_PROVIDERS;

  const findWatchProvider = (id: string) => {
    const numberId = Number(id);
    const watchProvider = find(watchProviders, ["provider_id", numberId]);
    return watchProvider ? watchProvider.provider_name : null;
  };

  const handleWatchProviderChange = (e: any) => {
    const filters = Object.assign({}, activeFilters);
    filters.with_watch_providers = e;
    filters.watch_region = "US";
    setActiveFilters(filters);
  };

  const [options, setOptions] = useState([]);

  const loadOptions = useCallback(
    (activeFilters?: IFilters | undefined) => {
      const url = getMovieDBCallUrl(`discover/${movieDbKey}`);
      const defaultParams = {
        include_adult: false,
        sort_by: "popularity.desc",
        certification_country: "US",
      };

      const mergedParams = merge(defaultParams, activeFilters);

      const params = Object.assign({}, mergedParams);

      axios.get(url, { params: params }).then((response: any) => {
        if (movieDbKey === "tv") {
          const results = formatShowTitles(response.data.results);
          setOptions(results);
        } else {
          setOptions(response.data.results);
        }
      });
    },
    [activeFilters]
  );

  useEffect(() => {
    loadOptions(activeFilters);
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
        <List
          items={genres}
          itemId="id"
          displayProperty="name"
          title="Genres"
          onItemSelect={handleGenreChange}
        />
        <List
          items={watchProviders}
          itemId="provider_id"
          displayProperty="provider_name"
          title="Watch Providers"
          onItemSelect={handleWatchProviderChange}
        />
      </div>
      <div className="col-9">
        <div className="row">
          <div className="col-12">
            <h1>
              {activeFilters.with_genres
                ? findGenre(activeFilters.with_genres)
                : "All"} {title} on {activeFilters.with_watch_providers
                ? findWatchProvider(activeFilters.with_watch_providers)
                : "Any Watch Providers"}
            </h1>
          </div>
          {options.map((option: any) => (
            <div className="col-3" key={option.id}>
              <Link
                to={{
                  pathname: `/${movieDbKey}/${option.id}`,
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
        </div>
      </div>
    </div>
  );
}
export default FeatureLandingPage;
