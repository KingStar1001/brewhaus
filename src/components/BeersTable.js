import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../api/punk-api";

export default function BeersTable({ search }) {
  const navigate = useNavigate();

  const [beers, setBeers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

  const loaderRef = useRef(null);
  let observer;

  const loadMoreBeer = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setPage(page + 1);
    api
      .getBeers({ page: page + 1, perPage })
      .then((res) => {
        setBeers([...beers, ...res]);
        if (res.length === 0) {
          setIsAllDataLoaded(true);
        }
      })
      .catch((error) => {
        navigate("/error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    api
      .getBeers({ page: page, perPage })
      .then((res) => {
        setBeers([...res]);
        if (res.length === 0) {
          setIsAllDataLoaded(true);
        }
      })
      .catch((error) => {
        navigate("/error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const options = {
      rootMargin: "10px",
      threshold: 1.0,
    };

    if (observer) {
      observer.disconnect();
    }
    observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [beers]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      if (target.intersectionRatio >= 1) {
        loadMoreBeer();
      }
    }
  };

  const beerList = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th className="is-4">No</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {beerList.map((beer) => (
            <tr key={beer.id} ref={loaderRef}>
              <td>{beer.id}</td>
              <td>
                <Link to={`/beers/${beer.id}`}>{beer.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!isAllDataLoaded && (
        <button onClick={loadMoreBeer} disabled={isLoading}>
          Load More
        </button>
      )}
    </div>
  );
}
