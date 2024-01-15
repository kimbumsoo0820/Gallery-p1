import axios from "axios"
import { useEffect, useState } from "react"

const calMonth = (getNum) => {
    getNum++
    if(getNum<10) {
        return (`0${getNum}`)
    }
    else {
        return getNum
    }
}

  const getWeather =  (lat, lon, key) =>  {
    let today = new Date()
    let year = today.getFullYear()
    let month = calMonth(today.getMonth())
    let date = today.getDate()
    let dateForm = `${year}${month}${date}`
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${key}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${dateForm}&base_time=0630&nx=${lat}&ny=${lon}`
    return axios.get(url)
    .then((res)=> {
        let skyData = res.data.response.body.items.item.find(x => x.category === 'SKY')
        console.log('skyData.fcstValue',skyData.fcstValue)
        return skyData.fcstValue
    })
    .catch((e)=> {
        console.log('에러',e)
        return 
    })
  }

export default function Home() {
    
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const x = 55
    const y = 127
    const [skyData, setSkyData] = useState()

    useEffect( ()=> { // axios호출하고 그 값을 useEffect안에서 setState할 때  async await을 useEffect에 넣어주어야 함
        async function setData() {
             setSkyData(await getWeather(x,y,API_KEY))
        }
        setData()
    },[])
    

    return (
        <>
            <div>hello</div>
            <div>현재 날씨 정보는{skyData?skyData:'??'}</div>

        </>
    )
}