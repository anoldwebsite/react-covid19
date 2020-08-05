import styles from './App.styles.css';
import React, { useState, useEffect } from 'react';
import { fetchCovidData, fetCountriesData } from './api/';
import CovidCards from './components/cards/all-cards/Cards';
import useDropDown from './components/dropdownbox/dropdownMaker';

function App() {
    const [data, setData] = useState({});//Initialiaing with an empty object. This object will have data that we retrieve from the REST API
    
    //Get a list of countries from the API
    const [countryList, setCountryList] = useState([]);
    useEffect(() => {
        const fetchCountriesFromAPI = async () => {
            const countries = await fetCountriesData();
            countries.unshift('Global');
            setCountryList(countries);
        };
        fetchCountriesFromAPI();
    }, []);

    const [country, CountryDropDown] = useDropDown("Select a Country: ", "", countryList);

    //Get covid-19 data from the API endpoint when this component is loading, unloading or when the country changes
    useEffect(() => {
        const getFromAPI = async (country) => {
            setData(await fetchCovidData(country));
        };

        country=== 'Global' ? getFromAPI('') : getFromAPI(country);
    }, [country]);

    return (
        <div className={styles.container}>
            <CovidCards data={data} />
            <CountryDropDown />
        </div>
    );
}

export default App;
//Now, we can use this component App in src/index.js