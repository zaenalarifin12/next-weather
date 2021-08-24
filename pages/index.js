import Head from "next/head";
import { useEffect, useState } from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    return () => {};
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
      <div className="container">
        <input type="text" placeholder="search city" onChange={onChange} />

        {query.length > 3 && (
          <ul>
            {result.length > 0 ? (
              result.map((city) => {
                return (
                  <li key={city.slug}>
                    <Link href={`/location/${city.slug}`}>
                      <a>
                        {city.name}
                        {city.state ? `, ${city.state}` : ""}{" "}
                        <span>({city.country})</span>
                      </a>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="">Data Not Found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
