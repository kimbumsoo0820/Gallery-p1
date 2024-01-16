import { useState, useEffect } from "react";
import axios from "axios"

const calMonth = (getNum) => {
    getNum++
    if(getNum<10) {
        return (`0${getNum}`)
    }
    else {
        return getNum
    }
}

const getTime = (today) => { // today = new Date()
    const hour = ('0' + today.getHours()).slice(-2); 
    const minute = ('0' + today.getMinutes()).slice(-2);
    return `${Number(hour)-1}${minute}`
}

const getDateForm = (today) => {
    const year = today.getFullYear()
    const month = calMonth(today.getMonth())
    const date = today.getDate()
    return `${year}${month}${date}`
}

const getLocation =  (setLocation) => {
    const { geolocation } = navigator;
    // 사용된 브라우저에서 지리적 위치(Geolocation)가 정의되지 않은 경우 오류로 처리합니다.
    if (!geolocation) {
      // 에러 처리
      return;
    }

    const geolocationOptions = {
        enableHighAccuracy: true,
        timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        maximumAge: 1000 * 3600 * 24, // 24 hour
        }
    // Geolocation API 호출
    const success = (locationData) => {
        setLocation(locationData) 
    }
    const error = (error) => {
        return
    }
    geolocation.getCurrentPosition(success, error, geolocationOptions);
}

const useWeatherData = () => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  const [weatherData, setWeatherData] = useState();
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY // 개인키 호출

  const getWeather = async (key) =>  {
    const today = new Date()
    const timeForm = getTime(today)
    const dateForm = getDateForm(today)
    
    // 위치를 불러올 수 없는 경우를 대비
    let lat = 55 // 기본 위도값
    let lon = 127 // 기본 경도값

    getLocation(setLocation)

    if(location) {
        lat = Math.floor(location.coords.latitude)
        lon = Math.floor(location.coords.longitude)
    }
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${key}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${dateForm}&base_time=${timeForm}&nx=${lat}&ny=${lon}`
    return await axios.get(url)
    .then((res)=> {
        let skyData = res.data.response.body.items.item.find(x => x.category === 'SKY')
        console.log('Weather.jsx return data : ', skyData)
        return skyData
    })
    .catch((e)=> {
        setError(e)
        return 
    })
  }

  useEffect(()=> {
    async function setData() { // axios호출하고 그 값을 useEffect안에서 setState할 때  async await을 useEffect에 넣어주어야 함
        setWeatherData(await getWeather(API_KEY))
    }
    setData()
  },[location])

  return { weatherData, error };
};

export default useWeatherData;