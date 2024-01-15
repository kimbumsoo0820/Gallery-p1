import { useEffect, useState } from "react"
import getWeatherData from '../components/Weather'


export default function Home() {
    const [skyData, setSkyData] = useState()
    const weather = getWeatherData()
    
    useEffect( ()=> { 
        setSkyData(weather.skyData)
    },[weather])
    
    return (
        <>
            <div>hello</div>
            <div>현재 날씨 정보는{skyData?skyData:'??'}</div>

        </>
    )
}