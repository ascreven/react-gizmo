import React from "react";
import "./MovieDetail.scss";

function MovieDetail(props: any) {
  const imgSrc =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw0PDw0NDQ0NDQ0NDQ0NDQ8NDQ8PFREWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKy03LS03Ky0tKys3LSs3Ky0rLS0tLSsrNys3KysrKysrLSsrLSsrNysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A4eIoAAAAAAAAAAAAAACKAAAAAAgAAAAAAKCAoAAAAAAAIoAAAAAAAIoAAAgAAAKgCiAKBAAAAAAAAAAAAARQAAAAAAAAAABAUEFAAAAAAAAAAAFQAAAAAAAAAAARQAEABQAAAAAAAAAIAACKUAAAAAAAAAAA0AAAEUQFEAUAAAAAAAAAAAAFBAAFRQQAAABFQAUAQUAAAACAAAAAAAAAACooKggqKKiCoihAAAAABFEBQAAAAAAAAAAUEAAFQAAFEAVAAAARQEUARQAAAAAAAAAAAAUFQBUAoAIAAAAAAAICgAiooAAAAAAAAAICkAAAAAFQVRAAAEAABFQFABAUEFAAAAARQAAAAAIAACgrKoKgKACAAAAACAqKgKIAoAAAAAAAAAAAAAAAAAAAAACLQBFQBUAUQAUAAAAAAAAVUQRUUVBQqoIAAAAIKAIoAACAoAAAYAAAAAAAAAAAAAAAAACKAIoCAAAACgaACoCioAACAgAoAEAAgAAAFFFoyoIJVACkABAAoAKAD//Z";
  const score = (Math.round(props.movie.vote_average * 10) / 10).toFixed(1);

  return (
    <div className="moviedetail row">
      <img src={imgSrc} className="col detail__img" alt="..."></img>
      <div className="col moviedetail__info">
        <h3 className="moviedetail__title">{props.movie.title}</h3>
        {props.subtitle &&
          <h4 className="moviedetail__subtitle">Subtitle</h4>
        }

        
        <div className="badge badge-secondary">{score}</div>

        <h4 className="moviedetail__genre">{props.genre}</h4>
        <h5 className="moviedetail__date">{props.movie.release_date}</h5>

        <h5 className="moviedetail__overview">{props.movie.overview}</h5>
        {props.movie.video &&
          <a className="moviedetail__button" href="{props.movie.video}">Watch Trailer</a>
        }
      </div>
    </div>
  );
}
export default MovieDetail;
