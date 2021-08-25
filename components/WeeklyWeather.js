import React from 'react'
import moment from 'moment-timezone'
import Image from "next/image"

export default function WeeklyWeather({ weeklyWeather, timezone }) {
    return (
        <div >
            <h1>Weekly</h1>

            {weeklyWeather.length > 0 && weeklyWeather.map((weather, index) => {
                if (index == 0) {
                    return;
                }

                return <div>
                    <div className="card mt-4" style={{ backgroundColor: "#3D087B" }} key={`li${index}`}>
                        <div className="card-body" style={{ color: "white" }}>

                            <div>
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt="Weather Icon"
                                />
                            </div>
                            <div>

                                <h3>{moment.unix(weather.dt).tz(timezone).format("dddd")}</h3>

                                <h5 >
                                    <span>{weather.temp.max.toFixed(0)}&deg;C</span>
                                    <span>{weather.temp.min.toFixed(0)}&deg;C</span>
                                </h5>

                            </div>

                            <div>
                                <h3>Sunrise</h3>
                                <p>
                                    {moment.unix(weather.sunrise).tz(timezone).format("LT")}
                                </p>

                                <h2>Sunset</h2>
                                <p>{moment.unix(weather.sunset).tz(timezone).format("LT")}</p>

                            </div>

                            <h5>{weather.weather[0].description}</h5>

                        </div>
                    </div>
                </div>
            })}

        </div>
    )
}
