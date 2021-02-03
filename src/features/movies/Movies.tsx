import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { find } from "lodash";
import axios from "axios";

import GENRES from "../../mock/genres.mock";
import Card from "../../shared/card/Card";
import MovieDetail from "./movie-detail/movie-detail";
import getMovieDBCallUrl from "../../services/movieDB.service";

function Movies() {
  const url = getMovieDBCallUrl(`discover/movie`);
  const [movies, setMovies] = useState([]);

  const loadMovies = useCallback(() => {
    axios.get(url).then((response: any) => {
      setMovies(response.data.results);
    });
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  let { path } = useRouteMatch();

  const findGenre = (id: Number) => {
    const genre = find(GENRES, ["id", id]);
    return genre ? genre.name : null;
  };

  return (
    <div className="row">
      <Switch>
        <Route exact path={path}>
          {movies.map((movie: any) => (
            <div className="col-3" key={movie.id}>
              <Link to={{
                pathname:`/movies/${movie.id}`,
                state: {
                  imgSrc: movie.poster_path,
                  title: movie.title,
                  originalTitle: movie.original_title,
                  score: movie.vote_average,
                  releaseDate: movie.release_date,
                  overview: movie.overview,
                  video: movie.video,
                  genre: findGenre(movie.genre_ids[0])
                }
                }} >
                <Card
                  img={movie.backdrop_path}
                  title={movie.title}
                  score={movie.vote_average}
                  genre={findGenre(movie.genre_ids[0])}
                />
              </Link>
            </div>
          ))}
        </Route>

        <Route path={`${path}/:id`}
                  render={(routeProps: any) => (
                    <MovieDetail {...routeProps} />
              )}
            />
      </Switch>
    </div>
  );
}

export default Movies;
