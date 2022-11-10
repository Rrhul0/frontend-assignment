import { useEffect, useState } from 'react'

//api endpoint
const API_ENDPOINT = 'https://api.blockcypher.com/v1/eth/main'

export default function BlockHeightWidget() {
    const [height, setHeight] = useState(0)

    useEffect(() => {
        //get height every 15 sec as 
        //api has limit of 100 requests every hour
        setInterval(function () {
            getHeight()
                .then(hei => setHeight(hei))
                .catch(() => console.log('error in fetch height'))
        }, 15000)
    }, [])

    return <>Current Block Height: {height}</>
}

async function getHeight() {
    const res = await fetch(API_ENDPOINT)
    const resJson = await res.json()
    const height: number = resJson.height
    return height
}
