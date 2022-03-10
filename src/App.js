import logo from './logo.svg';
import './App.css';
import './weatherNow.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {

  const [weatherNow, setWeatherNow] = useState({baseDate: "-", baseTime: "-", pty: "-", reh: "-", rn1: "-", t1H: "-", uuu: "-", vec: "-", vvv: "-", wsd: "-", sky: "-"});

  const [shortTermForecast, setShortTermForecast] = useState([]);

  useEffect(()=>{

    axios.get('http://localhost:8080/api/currentweather')
    .then((result)=>{ setWeatherNow(result.data); console.log(result.data)})
    .catch(()=>{ console.log("통신실패"); })


    axios.get('http://localhost:8080/api/shorttermweather')
    .then((result)=>{ setShortTermForecast(result.data); console.log(result.data)})
    .catch(()=>{ console.log("통신실패"); })
    
  }, [])

  return (
  
    <div className="App">
      
       <WeatherNow weatherNow = {weatherNow}/>
       <ShortTermForecast shortTermForecast = {shortTermForecast}/>
    </div>
  );
}

function WeatherNow(props){

  //하늘 상태에 따라 날씨 이미지 변경
  let sky = {맑음 : "clearDay", 구름많음 : "cloudyDay", 흐림 : "overcast"};
  let pty = {비 : "rainy", "비/눈" : "rainSnow", 눈 : "snow", 빗방울 : "raindrop", 빗방울눈날림 : "raindropSnow", 눈날림 : "heavySnow"};
  
  return(

     <div className="container">

        <table>
          <tbody>
            <tr>
              <td rowSpan="3" className="weatherNowImage" id={(props.weatherNow.pty != '없음') ? pty[props.weatherNow.pty] : sky[props.weatherNow.sky]}></td>
              <th colSpan="3">{props.weatherNow.baseDate} {props.weatherNow.baseTime}</th>
            </tr>
            <tr>
              
              <td colSpan="2" className="currentTemperature">
                <strong>&nbsp;{props.weatherNow.t1H}</strong>
              </td>
              <td className="currentStatus">
                <span>
                  {
                    (props.weatherNow.pty != '없음') ? props.weatherNow.pty : props.weatherNow.sky
                  }
                </span>
              </td>
            </tr>
          
            <tr>
              <td className="currentInfo">습도 <strong>{props.weatherNow.reh}</strong></td>
              <td>강수 <strong>
                {(props.weatherNow.pty != '없음') ? props.weatherNow.rn1 : '없음'}</strong></td>
              <td>바람({props.weatherNow.vec}) <strong>{props.weatherNow.wsd}</strong></td>
            </tr>
          </tbody>
        </table>
        
      </div>
  )
}

function ShortTermForecast(){

    return(
     <div className="container">
      변경사항 적용되는지 테스트
          
    </div>
    )
}

export default App;