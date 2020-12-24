import "./Card.css";

function Card() {
    return (
        <div className="card">
            <div className="card__head row">
                <div className="col">
                    <span className="card__subtitle">Subtitle</span>
                    <span className="card__title">Title</span>
                </div>

                <div className="col-auto">
                    <div className="card__badge">9.4</div>
                </div>
            </div>

            <span className="card__genre">Genre</span>
        </div>
    );
}
export default Card;
