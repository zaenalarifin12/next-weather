import moment from 'moment-timezone'
import React from 'react'
import cities from "../../lib/city.list.json"
import HourlyWeather from '../../components/HourlyWeather'
import WeeklyWeather from '../../components/WeeklyWeather'
import TodaysWeather from '../../components/TodaysWeather'
import Link from "next/link"

export async function getServerSideProps(context) {
    const city = getCityId(context.params.city)

    if (!city) {
        return {
            notFound: true
        }
    }

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
    )


    const data = await res.json()

    
    if (!data) {
        return {
            notFound: true
        }
    }

    const hourlyWeather = getHourlyWeather(data.hourly, data.timezone)

    const weeklyWeather = data.daily

    console.log(data);

    return {
        props: {
            city: city,
            timezone: data.timezone,
            currentWeather: data.current,
            hourlyWeather: hourlyWeather,
            weeklyWeather: weeklyWeather
        }
    }
}

const getCityId = (param) => {

    const cityParam = param.trim()
    // get id of city
    const splitCity = cityParam.split("-")
    const id = splitCity[splitCity.length - 1]

    if (!id) {
        return null
    }

    const city = cities.find((city) => city.id.toString() == id)

    if (city) {
        return city
    } else {
        return null
    }

}

const getHourlyWeather = (hourlyData, timezone) => {
    const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    const eodTimeStamp = Math.floor(endOfDay / 1000)

    const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

    return todaysData

}

export default function City({
    city,
    weather,
    currentWeather,
    hourlyWeather,
    weeklyWeather,
    timezone
}) {
    return (
        <>

            <div className="container my-4">
                <Link href="/" >
                    <a> {`<< Home`} </a>
                </Link>

                <TodaysWeather
                    city={city}
                    weather={weeklyWeather[0]}
                    timezone={timezone}
                />

                <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
                <WeeklyWeather weeklyWeather={weeklyWeather} timezone={timezone} />
            </div>

        </>
    )
}
