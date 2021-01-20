import useFetch from "../../hooks/useFetch";
import List from "../../shared/list/List";
import Spinner from "../../shared/Spinner";

function Genres() {
  const { data: genres, loading, error } = useFetch("genres");
  if (error) throw error;
  if (loading) return <Spinner />;

  return <List items={genres} title="Genres" />;
}

export default Genres;
