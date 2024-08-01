import { useState, useEffect } from "react";
import axios from "../api";

const useFetch = (ENDPOINT) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;  // Prevent state updates on unmounted components

    const loadData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(ENDPOINT);
        if (isMounted) {
          setData(response.data?.payload);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;  
    };
  }, [ENDPOINT]);

  return [data, loading];
};

export default useFetch;
