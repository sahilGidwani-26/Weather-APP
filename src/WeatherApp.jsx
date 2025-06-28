import { useState } from "react"
import SearchBox from "./SearchBox"
import InfoBox from "./infoBox"
export default function  WeatherApp() {
    const [weatherInfo , setWeatherInfo] = useState({
        city : "Delhi",
        feelslike : 24.84,
        temp : 25.05,
        tempMin : 25.05,
        tempMax : 25.05,
        humidity : 47,
        weather : "Haze",
    });
    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }
    return (
        <div style={{textAlign : "center"}}>  
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    
    )
}