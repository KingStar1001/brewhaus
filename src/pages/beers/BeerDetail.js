import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { api } from "../../api/punk-api";

export default function BeerDetail() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [detail, setDetail] = useState({});
  const [isFulFilled, setIsFulFilled] = useState(false);

  useEffect(() => {
    api
      .getBeerById(id)
      .then((res) => {
        setDetail(res);
      })
      .catch((error) => {
        navigate("/error");
      })
      .finally(() => {
        setIsFulFilled(true);
      });
  }, []);

  const onClose = () => {
    navigate("/beers");
  };

  const {
    name,
    image_url,
    description,
    ibu,
    ingredients: { hops, malt } = {},
  } = detail;

  const content = () => {
    return (
      <div className="detail">
        <div className="close" onClick={onClose}>
          x
        </div>
        <img src={image_url} alt="brand" className="brand" />
        <div className="main">
          <div className="label-1">{name}</div>
          <div className="label-2 pt-1">{description}</div>
          <div className="info">
            <div className="is-full-width label-3 pt-1">
              IBUs:&nbsp;&nbsp;<span className="label-4">{ibu}</span>
            </div>
            <div className="is-full-width pt-1">
              <div className="label-3">Hops:</div>
              <div className="table-wrapper pt-2">
                <table>
                  <thead>
                    <tr>
                      <th className="is-4">Name</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeof hops === "object" &&
                      hops.map((hop, index) => (
                        <tr key={index}>
                          <td>{hop.name}</td>
                          <td>
                            {hop.amount.value}&nbsp;{hop.amount.unit}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="is-full-width pt-1">
              <div className="label-3">Malt Type:</div>
              <div className="table-wrapper pt-2">
                <table>
                  <thead>
                    <tr>
                      <th className="is-4">Name</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeof hops === "object" &&
                      malt.map((malt, index) => (
                        <tr key={index}>
                          <td>{malt.name}</td>
                          <td>
                            {malt.amount.value}&nbsp;{malt.amount.unit}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return <div>{isFulFilled && content()}</div>;
}
