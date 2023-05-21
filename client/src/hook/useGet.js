import { useState, useEffect } from 'react';

const useGet = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [url]);

  return { data, error, isLoading };
};

export default useGet;