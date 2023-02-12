import React, { useCallback, useContext, useEffect, useState } from "react";
import LinkCard from "../components/link-card.js/LinkCard";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/httpHook";
import Loader from "../components/Loader";
import "./screens.css";

export default function DetailScreen() {
  const linkId = useParams().id;
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const { token } = useContext(AuthContext);
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (error) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);
  
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div>
        <h2>Link Detail</h2>
        {!loading && link && <LinkCard link={link}/>}
      </div>
    </div>
  );
}
