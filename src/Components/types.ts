export type WeatherData = {
  name: string;
  weather: [{ icon: string; description: string }];
  main: {
    temp: string;
    feels_like: string;
    humidity: string;
  };
  wind: { speed: string };
  clouds: { all: string };
};
