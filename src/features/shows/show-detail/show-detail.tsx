import "./show-detail.scss";

function ShowDetail(props: any) {
  const {imgSrc, title, originalTitle, score, releaseDate, overview, video, genre} = props.location.state;

  return (
    <div className="show-detail row">
      <img src={`https://image.tmdb.org/t/p/original${imgSrc}`} className="col-3 detail__img" alt="..."></img>
      <div className="col show-detail__info">
        <h3 className="show-detail__title">{title}</h3>
        {originalTitle && (
          <h4 className="show-detail__subtitle">{originalTitle}</h4>
        )}

        <div className="badge badge-secondary">{score}</div>

        <h4 className="show-detail__genre">{genre}</h4>
        <h5 className="show-detail__date">{releaseDate}</h5>

        <h5 className="show-detail__overview">{overview}</h5>
        {video && (
          <a className="show-detail__button" href="{show.video}">
            Watch Trailer
          </a>
        )}
      </div>
    </div>
  );
}
export default ShowDetail;
