import "./movie-detail.scss";

function MovieDetail(props: any) {
  const {imgSrc, title, originalTitle, score, releaseDate, overview, video, genre} = props.location.state;

  return (
    <div className="movie-detail row">
      <img src={`https://image.tmdb.org/t/p/original${imgSrc}`} className="col-3 detail__img" alt="..."></img>
      <div className="col movie-detail__info">
        <h3 className="movie-detail__title">{title}</h3>
        {originalTitle && (
          <h4 className="movie-detail__subtitle">{originalTitle}</h4>
        )}

        <div className="badge badge-secondary">{score}</div>

        <h4 className="movie-detail__genre">{genre}</h4>
        <h5 className="movie-detail__date">{releaseDate}</h5>

        <h5 className="movie-detail__overview">{overview}</h5>
        {video && (
          <a className="movie-detail__button" href="{movie.video}">
            Watch Trailer
          </a>
        )}
      </div>
    </div>
  );
}
export default MovieDetail;
