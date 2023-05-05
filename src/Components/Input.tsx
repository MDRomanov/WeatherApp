import React, { useEffect, useState } from 'react';
import './input.css';
import { WeatherData } from './types';

function Input(): JSX.Element {
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('Москва');
  const [data, setData] = useState<WeatherData>({
    name: '',
    weather: [{ icon: '', description: '' }],
    main: {
      temp: '',
      feels_like: '',
      humidity: '',
    },
    wind: { speed: '' },
    clouds: { all: '' },
  });
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&lang=ru&units=metric`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err));
  }, [url]);

  return (
    <div className="weather">
      <div className="search">
        <input
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
            event.key === 'Enter' ? setSearch(value) : null}
          placeholder="Пожалуйста, введите город"
          type="text"
        />
        <button
          type="button"
          onClick={(): void => {
            setSearch(value);
            setValue('');
          }}
          className="btn1"
        >
          Поиск
        </button>
      </div>
      {Object.keys(data).length && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? (
                <h1>{Number(data?.main.temp).toFixed()}°С</h1>
              ) : null}
            </div>

            {data.weather ? (
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="Идет загрузка..."
              />
            ) : null}
          </div>
          <div className="weather-type">
            {data.weather ? (
              <p>
                {data.weather[0].description.charAt(0).toUpperCase() +
                  data.weather[0].description.slice(1)}
              </p>
            ) : (
              <p>Данные отсутствуют</p>
            )}
          </div>
          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data?.main ? (
                  <p className="bold">
                    {Number(data.main.feels_like).toFixed()}°С
                  </p>
                ) : null}
                <p>По ощущению</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data?.main.humidity}%</p>
                ) : null}
                <p>Влажность</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">
                    {Number(data.wind.speed).toFixed()} м/с
                  </p>
                ) : null}
                <p>Скорость ветра</p>
              </div>
              <div className="clouds">
                {data.clouds ? (
                  <p className="bold">
                    {(Number(data.clouds.all).toFixed())}%
                  </p>
                ) : null}
                <p>Облачность</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Input;
