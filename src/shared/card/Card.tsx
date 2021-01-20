import "./Card.scss";

function Card(props: any) {


  const score = (Math.round(props.score * 10) / 10).toFixed(1);

  return (
      <div className="card">
        {props.img && (
          <img src={`https://image.tmdb.org/t/p/original${props.img}`} className="card-img" alt="..."></img>
        )
        }
        <div className="card-img-overlay">
          <div className="card__head row">
            <div className="col card__header">
              {props.subtitle &&
                <span className="card__subtitle">Subtitle</span>
              }
              <h5 className="card-title">{props.title}</h5>
            </div>

            <div className="col-auto">
              <div className="badge badge-secondary">{score}</div>
            </div>
          </div>
          <span className="card__genre">{props.genre}</span>
        </div>
      </div>
  );
}
export default Card;
