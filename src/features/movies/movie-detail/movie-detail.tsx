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
  const imgSrc =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw0PDw0NDQ0NDQ0NDQ0NDQ8NDQ8PFREWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKy03LS03Ky0tKys3LSs3Ky0rLS0tLSsrNys3KysrKysrLSsrLSsrNysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A4eIoAAAAAAAAAAAAAACKAAAAAAgAAAAAAKCAoAAAAAAAIoAAAAAAAIoAAAgAAAKgCiAKBAAAAAAAAAAAAARQAAAAAAAAAABAUEFAAAAAAAAAAAFQAAAAAAAAAAARQAEABQAAAAAAAAAIAACKUAAAAAAAAAAA0AAAEUQFEAUAAAAAAAAAAAAFBAAFRQQAAABFQAUAQUAAAACAAAAAAAAAACooKggqKKiCoihAAAAABFEBQAAAAAAAAAAUEAAFQAAFEAVAAAARQEUARQAAAAAAAAAAAAUFQBUAoAIAAAAAAAICgAiooAAAAAAAAAICkAAAAAFQVRAAAEAABFQFABAUEFAAAAARQAAAAAIAACgrKoKgKACAAAAACAqKgKIAoAAAAAAAAAAAAAAAAAAAAACLQBFQBUAUQAUAAAAAAAAVUQRUUVBQqoIAAAAIKAIoAACAoAAAYAAAAAAAAAAAAAAAAACKAIoCAAAACgaACoCioAACAgAoAEAAgAAAFFFoyoIJVACkABAAoAKAD//Z";
  const score = (Math.round(movie.vote_average * 10) / 10).toFixed(1);

  return (
    <div className="movie-detail row">
      <h1>Movie Detail</h1>
      <img src={imgSrc} className="col detail__img" alt="..."></img>
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
