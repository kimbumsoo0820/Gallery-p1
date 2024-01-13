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

const getWeather = (lat, lon, key) => {
    let today = new Date()
    let year = today.getFullYear()
    let month = calMonth(today.getMonth())
    let date = today.getDate()
    let dateForm = `${year}${month}${date}`
    console.log(dateForm)
    let url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${key}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${dateForm}&base_time=0600&nx=${lat}&ny=${lon}`
    axios.get(url)
    .then((res)=> {
        console.log(res)
    })
    .catch((e)=> {
        console.log('에러',e)
    })
      
    
  }

export default function Home() {

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const x = 55
    const y = 127
    getWeather(x,y,API_KEY)

    return (
        <div>hello</div>
    )
}