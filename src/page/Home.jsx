import { useEffect, useState } from "react"
import getWeatherData from '../components/Weather'

const weatherState = (sky) => {
    switch (Number(sky)) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            console.log('1')
            return '맑음'
        case 6:
        case 7:
        case 8:
            console.log('2')
            return '구름 많음'
        case 9:
        case 10:
            console.log('3')
            return '흐림'
    }
}


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
            <div>현재 날씨 fcstValue는?{skyData?weatherState(skyData):'??'}</div>

        </>
    )
}