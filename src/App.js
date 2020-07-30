import React, { useState, useEffect } from 'react';
import styles from './App.styles.css';
import { fetchCovidData } from './api/';
import CovidCards from './components/cards/all-cards/Cards';


function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {
    getFromAPI();
  }, []); //Empty array means only on mounting and unmounting of the component render or re-render and not on updates.

  const getFromAPI = async (country) => {
    if (country) {
      setData(await fetchCovidData());
      setCountry(country);
    } else {
      setData(await fetchCovidData(country));
      setCountry('');
    }
  }

  /*   handleChangeOfCountry = async (country) => {
      getFromAPI(country);
    } */

  return (
    <div className={styles.container}>
      <CovidCards data={data} />
    </div>
  );
}

export default App;
