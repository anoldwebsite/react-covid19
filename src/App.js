import styles from './App.styles.css';
import React, { useState, useEffect } from 'react';
import { fetchCovidData } from './api/';
import CovidCards from './components/cards/all-cards/Cards';

function App() {
    const [data, setData] = useState({});//Initialiaing with an empty object. This object will have data that we retrieve from the REST API
    const [country, setCountry] = useState('');//Initialize with empty string

    //Get covid-19 data from the API endpoint when this component is loading
    useEffect(() => {
        getFromAPI();
    });

    const getFromAPI = async (country) => {
        if (country) {
            setData(await fetchCovidData(country));
            setCountry(country);
        } else {
            setData(await fetchCovidData());
            setCountry('');
        }
    }

    return (
        <div className={styles.container}>
            <CovidCards data={data} />
        </div>
    );
}

export default App;
//Now, we can use this component App in src/index.js