import React, { useCallback, useContext, useEffect, useState } from "react";
import LinkTable from "../components/link-table/LinkTable";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/httpHook";
import Loader from "../components/Loader";

export default function LinksScreen() {
  const { request, loading } = useHttp();
  const [links, setLinks] = useState([]);
  const [local, setLocal] = useState(false);
  const { token } = useContext(AuthContext);

  const getLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (error) {}
  }, [request, token]);

  const deleteHandler = useCallback(
    async (linkId, index) => {
      setLocal(true);
      try {
        const res = await request(
          `/api/link/delete/${linkId}`,
          "DELETE",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        if (res?.success) {
          const newLinks = [...links];
          newLinks.splice(index, 1);
          setLinks(newLinks);
        }
        setLocal(false);
      } catch (error) {
        setLocal(false);
      }
    },
    [request, token, links]
  );
  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading && !local) {
    return <Loader />;
  }
  return (
    <div className="container-links">
      <div>
        <h2>My Links</h2>
        <LinkTable links={links} deleteHandler={deleteHandler} local={local}/>
      </div>
    </div>
  );
}
