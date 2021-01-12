import React from "react";
import {find} from "lodash";
import "./movie-detail.scss";
import MOVIES from "../../mock/movies.mock";
import GENRES from "../../mock/genres.mock";

function MovieDetail(props: any) {
  const movie = MOVIES[0];
  const genre = GENRES[0];
  const imgSrc =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw0PDw0NDQ0NDQ0NDQ0NDQ8NDQ8PFREWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKy03LS03Ky0tKys3LSs3Ky0rLS0tLSsrNys3KysrKysrLSsrLSsrNysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A4eIoAAAAAAAAAAAAAACKAAAAAAgAAAAAAKCAoAAAAAAAIoAAAAAAAIoAAAgAAAKgCiAKBAAAAAAAAAAAAARQAAAAAAAAAABAUEFAAAAAAAAAAAFQAAAAAAAAAAARQAEABQAAAAAAAAAIAACKUAAAAAAAAAAA0AAAEUQFEAUAAAAAAAAAAAAFBAAFRQQAAABFQAUAQUAAAACAAAAAAAAAACooKggqKKiCoihAAAAABFEBQAAAAAAAAAAUEAAFQAAFEAVAAAARQEUARQAAAAAAAAAAAAUFQBUAoAIAAAAAAAICgAiooAAAAAAAAAICkAAAAAFQVRAAAEAABFQFABAUEFAAAAARQAAAAAIAACgrKoKgKACAAAAACAqKgKIAoAAAAAAAAAAAAAAAAAAAAACLQBFQBUAUQAUAAAAAAAAVUQRUUVBQqoIAAAAIKAIoAACAoAAAYAAAAAAAAAAAAAAAAACKAIoCAAAACgaACoCioAACAgAoAEAAgAAAFFFoyoIJVACkABAAoAKAD//Z";
  const score = (Math.round(movie.vote_average * 10) / 10).toFixed(1);

  const findMovie = (id:  Number) => {
    return find(MOVIES, ['id', id]);
  };
  const findGenre = (id:  Number) => {
    const genre = find(GENRES, ['id', id]);
    return genre ? genre.name : null;
  };
  //findGenre(movie.genre_ids[0])

  return (
    <div className="moviedetail row">
      <img src={imgSrc} className="col detail__img" alt="..."></img>
      <div className="col moviedetail__info">
        <h3 className="moviedetail__title">{movie.title}</h3>
        {movie.original_title &&
          <h4 className="moviedetail__subtitle">Subtitle</h4>
        }

        
        <div className="badge badge-secondary">{score}</div>

        <h4 className="moviedetail__genre">{genre.name}</h4>
        <h5 className="moviedetail__date">{movie.release_date}</h5>

        <h5 className="moviedetail__overview">{movie.overview}</h5>
        {movie.video &&
          <a className="moviedetail__button" href="{movie.video}">Watch Trailer</a>
        }
      </div>
    </div>
  );
}
export default MovieDetail;
