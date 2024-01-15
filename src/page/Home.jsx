import { useEffect, useState } from "react"
import getWeatherData from '../components/Weather'


export default function Home() {
    const [skyData, setSkyData] = useState()
    const weather = getWeatherData()
    
    
    useEffect( ()=> { // axios호출하고 그 값을 useEffect안에서 setState할 때  async await을 useEffect에 넣어주어야 함
        setSkyData(weather.skyData)
        
    },[weather])
    
    

    return (
        <>
            <div>hello</div>
            <div>현재 날씨 정보는{skyData?skyData:'??'}</div>

        </>
    )
}