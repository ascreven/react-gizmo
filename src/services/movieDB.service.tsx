function getMovieDBCallUrl(url: string) :string {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const apiKey = process.env.REACT_APP_MOVIEDB_KEY;
  return `${baseUrl}${url}?api_key=${apiKey}`
}

export default getMovieDBCallUrl;
