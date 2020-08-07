import React from "react";
import { Grid } from "@material-ui/core";
import CovidCard from "../card/Card";
import styles from "./Cards.css";

const CovidCards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) return "Loading...";

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <CovidCard
          className={styles.infected}
          cardTitle="Infected"
          value={confirmed.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of Active Cases Infected with Covid-19"
        />
        <CovidCard
          className={styles.recovered}
          cardTitle="Recovered"
          value={recovered.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of Recovered from Covid-19"
        />
        <CovidCard
          className={styles.deaths}
          cardTitle="Deaths"
          value={deaths.value}
          lastUpdate={lastUpdate}
          cardSubtitle="Number of Deaths Caused by Covid-19"
        />
      </Grid>
    </div>
  );
};

export default CovidCards;
