import moment from 'moment-timezone'
import React from 'react'
import Image from "next/image";

export default function TodaysWeather({ city, weather, timezone }) {
    return (
        <div className="card mt-4" style={{ borderRadius: 10, backgroundColor: "#2D46B9" }}>
            <div className="card-body">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                />
                <h1 style={{ color: "white" }}>{city.name} {city.country}</h1>

                <h2>
                    <span style={{ color: "white" }}>{weather.temp.max.toFixed}</span>
                    <span>{weather.temp.min.toFixed}</span>
                </h2>

                <div >
                    <span style={{ color: "white" }}>Sunrise</span> <br />
                    <span style={{ color: "white" }}>
                        {moment.unix(weather.sunrise).tz(timezone).format("LT")}
                    </span>

                    <br></br>

                    <span style={{ color: "white" }}>
                        Sunset
                    </span> <br />
                    <span style={{ color: "white" }}>
                        {moment.unix(weather.sunset).tz(timezone).format("LT")}
                    </span>
                </div>

            </div>

        </div>
    )
}
