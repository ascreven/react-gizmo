import React from "react";

import useFetch from "../../../hooks/useFetch";
import GENRES from "../../../mock/genres.mock";
import Spinner from "../../../shared/Spinner";
import "./movie-detail.scss";

function MovieDetail(props: any) {
  const id = props.match.params.id;
  const { data: movie, loading, error } = useFetch(`movies/${id}`);

  if (loading) return <Spinner />;
  if (error) throw error;

  const genre = GENRES[0];
  const imgSrc = "https://image.tmdb.org/t/p/original" + movie.poster_path;
  const score = (Math.round(movie.vote_average * 10) / 10).toFixed(1);

  return (
    <div className="movie-detail row">
      <img src={imgSrc} className="col-3 detail__img" alt="..."></img>
      <div className="col movie-detail__info">
        <h3 className="movie-detail__title">{movie.title}</h3>
        {movie.original_title && (
          <h4 className="movie-detail__subtitle">Subtitle</h4>
        )}

        <div className="badge badge-secondary">{score}</div>

        <h4 className="movie-detail__genre">{genre.name}</h4>
        <h5 className="movie-detail__date">{movie.release_date}</h5>

        <h5 className="movie-detail__overview">{movie.overview}</h5>
        {movie.video && (
          <a className="movie-detail__button" href="{movie.video}">
            Watch Trailer
          </a>
        )}
      </div>
    </div>
  );
}
export default MovieDetail;
