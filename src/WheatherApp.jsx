import { useState } from "react";

export const WheatherApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "fd7bc6cad1f858d419823f3b92a369ae";
  const difKelvin = 273.15;

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleSumit = (e) => {
    e.preventDefault();

    if (ciudad.length === 0) return;

    //llamar el fech
    fetchClima();
  };

  const fetchClima = async () => {
    try {
      const res = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
      const data = await res.json();

      setDataClima(data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Aplicación de clima</h1>

      <form onSubmit={handleSumit}>
        <input
          type="text"
          className="form-control"
          name="ciudad"
          value={ciudad}
          onChange={handleChange}
        />

        <button type="submit">Buscar</button>
      </form>

      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)} ºC</p>
          <p>Condición meteorológica: {dataClima.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};
