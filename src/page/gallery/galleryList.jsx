import style from './galleryListStyle.module.css'
import React, { useEffect, useLayoutEffect, useState } from 'react';


export default function Home() {
    const [category, setCategory] = useState(['All', 'Gallery', 'Info'])
    




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