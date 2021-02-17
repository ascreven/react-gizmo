import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { find } from "lodash";
import axios from "axios";

import Card from "../../shared/card/Card";
import ShowDetail from "./show-detail/show-detail";
import getMovieDBCallUrl from "../../services/movieDB.service";
import { IFilters } from "../../containers/filters/filters.model";

type props = {
  filters?: IFilters;
  genres?: any[];
};

function Shows(props: props) {
  const [shows, setShows] = useState([]);

  const loadShows = useCallback((filters?: IFilters | undefined) => {
    const url = getMovieDBCallUrl(`discover/tv`);
    const defaultParams = {
      include_adult: false,
      sort_by: 'popularity.desc',
      certification_country: 'US'
    };
    
    const params = Object.assign({}, defaultParams, filters);

    axios.get(url, {params: params}).then((response: any) => {
      setShows(response.data.results);
    });
  }, [props.filters]);

  useEffect(() => {
    loadShows(props.filters);
  }, [loadShows]);

  let { path } = useRouteMatch();

  const findGenre = (id: Number) => {
    const genre: any = find(props.genres, ["id", id]);
    return genre ? genre.name : null;
  };

  return (
    <div className="row">
      <Switch>
        <Route exact path={path}>
          {shows.map((show: any) => (
            <div className="col-3" key={show.id}>
              <Link to={{
                pathname:`/Shows/${show.id}`,
                state: {
                  imgSrc: show.poster_path,
                  title: show.name,
                  originalTitle: show.original_title,
                  score: show.vote_average,
                  releaseDate: show.release_date,
                  overview: show.overview,
                  video: show.video,
                  genre: findGenre(show.genre_ids[0])
                }
                }} >
                <Card
                  img={show.backdrop_path}
                  title={show.name}
                  score={show.vote_average}
                  genre={findGenre(show.genre_ids[0])}
                />
              </Link>
            </div>
          ))}
        </Route>

        <Route path={`${path}/:id`}
                  render={(routeProps: any) => (
                    <ShowDetail {...routeProps} />
              )}
            />
      </Switch>
    </div>
  );
}

export default Shows;
