import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { find } from "lodash";
import axios from "axios";

import GENRES from "../../mock/genres.mock";
import Card from "../../shared/card/Card";
import ShowDetail from "./show-detail/show-detail";
import getMovieDBCallUrl from "../../services/movieDB.service";

function Shows() {
  const url = getMovieDBCallUrl(`discover/tv`);
  const [shows, setShows] = useState([]);

  const loadShows = useCallback(() => {
    axios.get(url, {params: {
      sort_by: 'popularity.desc',
      certification_country: 'US'
    }}).then((response: any) => {
      setShows(response.data.results);
    });
  }, []);

  useEffect(() => {
    loadShows();
  }, [loadShows]);

  let { path } = useRouteMatch();

  const findGenre = (id: Number) => {
    const genre = find(GENRES, ["id", id]);
    return genre ? genre.name : null;
  };

  return (
    <div className="row">
      <div className="col-12">
        <h1>Shows</h1>
      </div>
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
