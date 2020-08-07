import styles from './App.styles.css';
import React, { useState, useEffect } from 'react';
import { fetchCovidData, fetCountriesData } from './api/';
import CovidCards from './components/cards/all-cards/Cards';
import useDropDown from './components/dropdownbox/dropdownMaker';
import Chart from './components/charts/chart';
import { CHART_TYPES as chartsList } from './components/charts/constants';
import covid19 from './images/covid19.png';

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

    const [country, CountryDropDown] = useDropDown("Select a Country: ", "China", countryList);
    const [chartType, ChartTypeDropDown] = useDropDown("Select a Chart: ", "Bar", chartsList);

    //Get covid-19 data from the API endpoint when this component is loading, unloading or when the country changes
    useEffect(() => {
        const getFromAPI = async (country) => {
            setData(await fetchCovidData(country));
        };

        country === 'Global' ? getFromAPI('') : getFromAPI(country);
    }, [country]);

    return (
        <div className={styles.container}>
            <img className={styles.image} src={covid19} alt="Covid-19" />
            <CovidCards data={data} />
            <CountryDropDown />
            <Chart data={data} country={country} chartType={chartType} />
            <ChartTypeDropDown />
        </div>
    );
}

export default App;
//Now, we can use this component App in src/index.js