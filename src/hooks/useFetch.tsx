import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const apiKey = process.env.REACT_APP_MOVIEDB_KEY;

export default function useFetch(url: string): any {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(`${baseUrl}${url}?api_key=${apiKey}`);
        if (response.ok) {
          const json = await response.json();
          setData(json.results);
        } else {
          throw response;
        }
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [url]);

  return { data, error, loading };
}
