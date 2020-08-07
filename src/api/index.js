import axios from 'axios';

//This is the api that we will fetch data from 
const baseUrl = 'https://covid19.mathdro.id/api';

export const fetchCovidData = async (country) => {
    let url = baseUrl;

    if (country) url = `${baseUrl}/countries/${country}`
    try {
        const { data: {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        } } = await axios.get(url); //destructuring props that we need

        return {
            confirmed, recovered, deaths, lastUpdate
        };
    } catch (error) {
        return error;
    }
};

export const fetCountriesData = async () => {
    try {
        const { data: { countries } } = await axios.get(`${baseUrl}/countries`);
        //Now we have an array of countries
        return countries.map((country) => country.name);//Returning an array of country names.
    } catch (error) {
        return error;
    }
};

export const fetchDailyCoviData = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/daily`);//data is an array
        /*
        A property can be unpacked from an object and assigned to a variable
         with a different name than the object property.
         Here we are using date and assigning resportDate to it.
        */
        return data.map(({ confirmed, recovered ,deaths, reportDate: date }) => (
            //returning the object below
            {
                confirmed: confirmed.total,
                recovered: recovered.total,
                deaths: deaths.total,
                date
            }
        ));
    } catch (error) {
        return error;
    }
};

