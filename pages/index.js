import Head from "next/head";
import { useEffect, useState } from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";
import { ListGroup } from 'react-bootstrap';

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    return () => { };
  }, []);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let mathcingCities = [];

    if (value.length > 3) {
      for (let city of cities) {
        if (mathcingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };

          mathcingCities.push(cityData);
          continue;
        }
      }
    }

    return setResult(mathcingCities);
  };

  return (
    <div>
      <div className="container mt-4">
        <input
          type="text"
          placeholder="search city"
          onChange={onChange}
          className="form-control"
        />

        {query.length > 3 && (

          <ListGroup defaultActiveKey="#link1">
            {result.length > 0 ? (
              result.map((city) => {
                return (
                  <ListGroup.Item action href={`/location/${city.slug}`} key={city.slug}>
                    <a>
                      {city.name}
                      {city.state ? `, ${city.state}` : ""}{" "}
                      <span>({city.country})</span>
                    </a>
                  </ListGroup.Item>
                );
              })
            ) : (
              <ListGroup.Item action href={`#`} key={city.slug}>
              </ListGroup.Item>
            )}
          </ListGroup>

        )}
      </div>
    </div>
  );
}
