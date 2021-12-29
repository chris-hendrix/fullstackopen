import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getCountry = async (name) => {
  if (!name || name === '') return null;
  let country = { found: false };
  try {
    const response = await axios.get(`https://restcountries.com/v2/name/${name}`);
    const countries = response.data;
    if (Array.isArray(countries)) {
      if (countries.length > 0) country = { data: countries[0], found: true };
      return country;
    }
  } catch (error) {
    console.log(error);
  }
  return country;
};

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    getCountry(name)
      .then((country) => setCountry(country))
      .catch((error) => console.log(error));
  }, [name]);
  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
