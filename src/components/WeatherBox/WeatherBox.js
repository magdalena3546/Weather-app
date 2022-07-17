import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weather, setWeather] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const handleCityChange = useCallback(city => {
    setError(false);
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac889489c3a7d56f08c540284209d8e7&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              };
            setWeather(weatherData);
            setPending(false);
          });
        } else {
          setError(true);
        }
    });
  },[]);

  return (
    <section>
      <PickCity action={handleCityChange} />
      { (Object.keys(weather).length !== 0 && pending === false && error === false) && <WeatherSummary weather={weather} /> }
      { (pending === true && error === false) && <Loader /> }
      { error === true && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;