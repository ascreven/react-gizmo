import { Link} from 'react-router-dom';
import {find} from "lodash";

import List from '../shared/list/List';
import Card from '../shared/card/Card';
import MOVIES from '../mock/movies.mock';
import genres from '../mock/genres.mock';
import { Movie } from '../movies/movie.model';

function Home() {

  const findGenre = (id:  Number) => {
    const genre = find(genres, ['id', id]);
    return genre ? genre.name : null;
  };

  return (
    <div className="container-fluid">
        <div className="row">
            {MOVIES.map((movie: Movie) => (
                <div className="col-3" key={movie.id}>
                    <Link
                        to={{
                            pathname: `/${movie.id}`
                        }}
                    >
                        <Card title={movie.title} score={movie.vote_average} genre={findGenre(movie.genre_ids[0])} />
                    </Link>
                </div>
            ))}
            <div className="col">
                <List items={genres} title="Genres"/>
            </div>
        </div>
  </div>
  );
}
export default Home;
