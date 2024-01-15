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
    return `${hour}${minute}`
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
        // location = locationData
    }
    const error = (error) => {
        // setLocation(error.message)
        return
    }
    geolocation.getCurrentPosition(success, error, geolocationOptions);
}


const useWeatherData = (options = {}) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  const [skyData, setSkyData] = useState();

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY // 개인키 호출

  const getWeather =  (key) =>  {
    const today = new Date()
    const timeForm = getTime(today)
    
    let lat = 55 // 기본 위도값
    let lon = 127 // 기본 경도값

    getLocation(setLocation)

    // console.log(location)
    if(location) {
        lat = Math.floor(location.coords.latitude)
        lon = Math.floor(location.coords.longitude)
    }
    // console.log(lat, lon)
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${key}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20240115&base_time=${timeForm}&nx=${lat}&ny=${lon}`
    return axios.get(url)
    .then((res)=> {
        let skyData = res.data.response.body.items.item.find(x => x.category === 'SKY')
        // console.log('skyData',skyData)
        return skyData.fcstValue
    })
    .catch((e)=> {
        setError(e)
        return 
    })
  }

  useEffect(()=> {
    async function setData() {
        setSkyData(await getWeather(API_KEY))
    }
    
    setData()

  },[location])

  

  return { skyData, error };
};

export default useWeatherData;