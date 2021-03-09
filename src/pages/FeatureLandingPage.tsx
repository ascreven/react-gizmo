import axios from "axios";
import { find, merge } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IMovieDBDiscoverFilters } from "../models/filter.model";
import WATCH_PROVIDERS from "../mock/watchproviders.mock";
import getMovieDBCallUrl from "../services/movieDB.service";
import Card from "../shared/card/Card";
import Filters from '../layout/Filters';
import { convertCompilerOptionsFromJson } from "typescript";

type Props = {
  movieDbKey: string;
  title: string;
};

function FeatureLandingPage(props: Props) {
  const { movieDbKey, title } = props;

  let initialFilters: IMovieDBDiscoverFilters = {
    with_watch_providers: ["121"],
    with_genres: ["12", "16"],
    watch_region: "US"
  };
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const handleWatchProviderChange = (e: any) => {
    // const filters = Object.assign({}, activeFilters);
    // console.log(filters)
    // filters.with_watch_providers.push(e)
    // // filters.with_watch_providers = [e];

    // setActiveFilters(filters);

    console.log(activeFilters);
    const prevFilters = {...activeFilters};
    const test = [...prevFilters.with_watch_providers, e.toString()];
    console.log(test);
    const newFilters = {...activeFilters, with_watch_providers: test};
    console.log(newFilters);
    setActiveFilters({...activeFilters, with_watch_providers: test});
    console.log(activeFilters);
  };

  const watchProviders = {
    title: "Watch Providers",
    displayProperty: "provider_name",
    primaryKey: 'provider_id',
    onToggleHandler: handleWatchProviderChange,
    options:WATCH_PROVIDERS
  };
  const [filters, setFilters] = useState([watchProviders])

  const [genres, setGenres] = useState([]);

  const handleGenreChange = (e: any) => {
    const id: String = e.toString();
    console.log("current activeFilters:");
    console.log(activeFilters);
    const prevGenres = [...activeFilters.with_genres];
    if (prevGenres.includes(id)) {
      var index = prevGenres.indexOf(id)
      if (index !== -1) {
        prevGenres.splice(index, 1);
        console.log(prevGenres);
        setActiveFilters({...activeFilters, with_genres: prevGenres});
        console.log(activeFilters);
      }
    } else {
      const test = [...prevGenres, id];
      console.log(test);
      const temp: IMovieDBDiscoverFilters = {...activeFilters, with_genres: test};
      console.log("temp:");
      console.log(temp);
      setActiveFilters(temp);
      console.log("activeFilters after set:");
      console.log(activeFilters);
    }
  };

  const loadGenres = useCallback(() => {
    const genreCall = `genre/${movieDbKey}/list`;
    const url = getMovieDBCallUrl(genreCall);

    axios.get(url, {params: {
      language: 'en-US'
    }}).then((response: any) => {
      const genreFilter = {
        title: "Genres",
        primaryKey: "id",
        displayProperty: "name",
        onToggleHandler: handleGenreChange,
        options: response.data.genres
      };
      setFilters([...filters, genreFilter]);
    });
  }, []);

  useEffect(() => {
    loadGenres();
  }, [loadGenres]);

  const findWatchProvider = (id: string) => {
    const numberId = Number(id);
    const watchProvider = find(WATCH_PROVIDERS, ["provider_id", numberId]);
    return watchProvider ? watchProvider.provider_name : null;
  };

  const [options, setOptions] = useState([]);

  const loadOptions = useCallback(
    (activeFilters?: IMovieDBDiscoverFilters | undefined) => {
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
    const genre: any = find(genres, ["id", numberId]);
    return genre ? genre.name : null;
  };

  return (
    <div className="row">
      <div className="col-3">
        <Filters sections={filters} />
        {/* <List
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
          title="Watch  Providers"
          onItemSelect={handleWatchProviderChange}
        /> */}
      </div>
      <div className="col-9">
        <div className="row">
          <div className="col-12">
            <h1> {title}
              {/* {activeFilters.with_genres
                ? findGenre(activeFilters.with_genres)
                : "All"} {title} on {activeFilters.with_watch_providers
                ? findWatchProvider(activeFilters.with_watch_providers)
                : "Any Watch Providers"} */}
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
