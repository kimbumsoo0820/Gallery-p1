import style from './galleryListStyle.module.css'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from "axios"


const getWeather = (lat, lon, key) => {

    let url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${key}&numOfRows=10&pageNo=1&dataType=JSON&base_date=20210628&base_time=0600&nx=${lat}&ny=${lon}`
    axios.get(url)
    .then((res)=> {
        console.log(res)
    })
    .catch((e)=> {
        console.log('에러',e)
    })
      
    
  }

export default function Home() {
    const [category, setCategory] = useState(['All', 'Gallery', 'Info'])
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    console.log('API_KEY',API_KEY)
    const x = 55
    const y = 127
        getWeather(x,y,API_KEY)




    return (
        <div>
            <div>
                <div className={style.category}>
                    {category.map((data) => (
                        <div className='category' key={data}>
                            {data}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}