import { useCallback, useState } from "react";

export const useHttp = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      if(body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
      try {
        const response = await fetch(`https://shortenlink.onrender.com${url}`, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
        }

        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
