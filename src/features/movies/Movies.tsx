import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { find } from "lodash";

import GENRES from "../../mock/genres.mock";
import Card from "../../shared/card/Card";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../shared/Spinner";
import MovieDetail from "./movie-detail/movie-detail";

function Movies() {
  const { data: movies, loading, error } = useFetch("movies");
  let { path } = useRouteMatch();

  const findGenre = (id: Number) => {
    const genre = find(GENRES, ["id", id]);
    return genre ? genre.name : null;
  };

  if (error) throw error;
  if (loading) return <Spinner />;
  return (
    <div className="row">
      <Switch>
        <Route exact path={path}>
          {movies.map((movie: any) => (
            <div className="col-3" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
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
