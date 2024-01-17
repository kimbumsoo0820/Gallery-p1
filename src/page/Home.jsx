import { useEffect, useState } from "react"
import getWeatherData from '../components/Weather'


export default function Home() {
    const [skyData, setSkyData] = useState()
    const weather = getWeatherData()
    
    useEffect(()=> { 
        if(weather.weatherData){
            setSkyData(weather.weatherData.fcstValue)
        }
    },[weather])
    
    return (
        <>
            <div>hello world</div>
            <div>{skyData?'':'Loading...'}</div>
            <div>현재 날씨 fcstValue는?{skyData?skyData:'??'}</div>

        </>
    )
}