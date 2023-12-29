import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState("");
  const [stateSelected, setStateSelected] = useState("");
  const [citySelected, setCitySelected] = useState("");

  const handleCountryChange = (e) => {
    setSelected(e.target.value);
  };

  const handleStateChange = (e) => {
    setStateSelected(e.target.value);
  };

  const handleCityChange = (e) => {
    setCitySelected(e.target.value);
  };

  const getCountriesData = async () => {
    try {
      const data = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const res = await data.json();
      // const newArr = new Set(res); //set to remove duplicate countries
      setCountries(res);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatesData = async () => {
    try {
      const data = await fetch(
        `https://crio-location-selector.onrender.com/country=${selected}/states`
      );
      const res = await data.json();
      setStates(res);
      setCities([]); //Clear cities
      setCitySelected(""); //Reset city selection
    } catch (err) {
      console.error(err);
    }
  };

  const getCitiesData = async () => {
    try {
      const data = await fetch(
        `https://crio-location-selector.onrender.com/country=${selected}/state=${stateSelected}/cities`
      );
      const res = await data.json();
      setCities(res);
      setCitySelected(""); //Reset city selection
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  useEffect(() => {
    if (selected) {
      getStatesData();
    }
  }, [selected]);

  useEffect(() => {
    if (selected && stateSelected) {
      getCitiesData();
    }
  }, [selected, stateSelected]);
  return (
    <div className="App city-selector">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          onChange={handleCountryChange}
          value={selected}
          className="dropdown"
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
        <select
          onChange={handleStateChange}
          value={stateSelected}
          className="dropdown"
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
        <select
          onChange={handleCityChange}
          value={citySelected}
          className="dropdown"
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
      {citySelected && (
        <h2 className="result">
          You selected <span className="highlight">{citySelected}</span>,{" "}
          <span className="fade">
            {stateSelected}, {selected}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;
