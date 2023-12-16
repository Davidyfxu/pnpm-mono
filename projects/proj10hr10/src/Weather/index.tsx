import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { IconSearch } from "@douyinfe/semi-icons";
import { Input, Toast } from "@douyinfe/semi-ui";
import _ from "lodash";
const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const url = (city: string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
const getWeatherByLocation = async (city: string) => {
  try {
    // @ts-ignore
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();
    if (respData.cod === "404") return Toast.error("city not found");
    return respData;
  } catch (e) {
    console.error(e);
  }
};

function KtoC(K: number) {
  return Math.floor(K - 273.15);
}
const Weather = () => {
  const [weather, setWeather] = useState<any>({});
  const [city, setCity] = useState("");
  useEffect(() => {
    if (city.length > 0) getWeatherByLocation(city).then((r) => setWeather(r));
  }, [city]);

  return (
    <div className={styles.body}>
      <Input
        className={styles.searchPanel}
        suffix={<IconSearch />}
        showClear
        onEnterPress={(e: any) => {
          setCity(String(e.target.value));
        }}
      />
      {!_.isEmpty(weather) && !_.isEmpty(weather?.weather) && (
        <div className={styles.weather}>
          <h2>
            <img
              src={`https://openweathermap.org/img/wn/${_.get(
                weather,
                "weather[0].icon",
                ""
              )}@2x.png`}
            />
            {KtoC(weather?.main?.temp)}°C
            <img
              src={`https://openweathermap.org/img/wn/${_.get(
                weather,
                "weather[0].icon",
                ""
              )}@2x.png`}
            />
          </h2>
          <small>{_.get(weather, "weather[0].main", "")}</small>
        </div>
      )}
    </div>
  );
};

export default Weather;
