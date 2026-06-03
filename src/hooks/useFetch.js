import { useState, useEffect, useRef } from 'react';

const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelRef = useRef(false);
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  useEffect(() => {
    cancelRef.current = false;
    setLoading(true);
    setError(null);

    fetchFnRef.current()
      .then((res) => {
        if (!cancelRef.current) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelRef.current) {
          setError(err.message || 'Something went wrong');
          setLoading(false);
        }
      });

    return () => {
      cancelRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
};

export default useFetch;
