import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Image from "next/image"
import { Line } from 'react-chartjs-2';

export default function HourlyWeather({ hourlyWeather, timezone }) {

    const [ThisTimeZone, setThisTimeZone] = useState(timezone)

    const [dataHour, setDataHour] = useState([])
    const [suhu, setSuhu] = useState([])

    const [data, setData] = useState({})

    const chart = () => {
        let a = [];
        let te = [];
        let wi = [];
        hourlyWeather.forEach(weather => {
            let v = moment.unix(weather.dt).tz(ThisTimeZone, "US/Pacific").format("HH")
            a.push("JAM-"+v)
            let c = weather.temp.toFixed(0)
            te.push(c)
            let w = weather.wind_speed
            wi.push(w)
        });

        setDataHour(a)
        setSuhu(te)
// 
        setData({
            labels: dataHour, // jam 
            datasets: [{
                label: 'Suhu Celcius',
                data: suhu,  //suhu
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    
                ],
                borderWidth: 1
            },
            ]
        })
    }

    useEffect(() => {
        chart()
    }, [])
    return (
        <div>
            <h1>Hourly</h1>

            <div>

                <Line
                    data={data}
                    width={`100%`}
                    options={{ maintainAspectRatio: false }}
                />
            </div>

            <div className="row">
                {hourlyWeather.length > 0 &&
                    hourlyWeather.map((weather, index) => {
                        return <div className="col-4 mt-4" key={index}>
                            <div className="card" style={{ backgroundColor: "#0F52BA", color: "white" }}>
                                <div className="card-body">
                                    <span>{index == 0 ? "Now" : moment.unix(weather.dt).tz(timezone, "US/Pacific").format("HH:mm")}</span>

                                    <Image
                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={weather.weather[0].description}
                                        width="100"
                                        height="100"
                                    />
                                    <span>{weather.temp.toFixed(0)}&deg;C</span>

                                </div>

                            </div>

                        </div>
                    })
                }
            </div>
        </div>
    )
}
