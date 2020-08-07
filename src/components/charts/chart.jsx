import React, { useState, useEffect } from "react";
import {
  Line,
  Bar,
  HorizontalBar,
  Pie,
  Polar,
  Doughnut,
  Radar,
} from "react-chartjs-2";
import { fetchDailyCoviData } from "../../api/index";
import styles from "./charts.css";

const Chart = ({
  chartType,
  country,
  data: { confirmed, recovered, deaths },
}) => {
  let dataForAllExceptLineChart;
  if (confirmed) {
    dataForAllExceptLineChart = {
      labels: ["Infected", "Recovered", "Deaths"],
      datasets: [
        {
          label: "People",
          backgroundColor: [
            "rgba(0, 0, 255, 0.5)",
            "rgba(0, 255, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
          ],
          data: [confirmed.value, recovered.value, deaths.value]
        },
      ],
    };
  }

  //Bring Covid-19 daily data from the API
  const [dailyCovidData, setDailyCovidData] = useState({});

  useEffect(() => {
    const fetchDailyData = async () => {
      setDailyCovidData(await fetchDailyCoviData());
    };
    fetchDailyData();
  }, []);

  //Horiazontal Bar Chart
  const horizontalBarChart = confirmed ? (
    <HorizontalBar
      data={dataForAllExceptLineChart}
      options={{
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Current State in ${country}`,
        },
      }}
    />
  ) : null; //False case

  //Bar Chart
  const barChart = confirmed ? (
    <Bar
      data={dataForAllExceptLineChart}
      options={{
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Current State in ${country}`,
        },
      }}
    />
  ) : null; //False case

  //Donught Chart
  const donughtChart = confirmed ? (
    <Doughnut
      data={dataForAllExceptLineChart}
      options={{
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: `Current State in ${country}`,
        },
      }}
    />
  ) : null; //False case

  //Pie Chart
  const pieChart = confirmed ? (
    <Pie
      data={dataForAllExceptLineChart}
      options={{
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: `Current State in ${country}`,
        },
      }}
    />
  ) : null; //False case

  //Polar Chart
  const polarChart = confirmed ? (
    <Polar
      data={dataForAllExceptLineChart}
      options={{
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: `Current State in ${country}`,
        },
      }}
    />
  ) : null; //False case

  //Radar Chart
  const radarChart = confirmed ? (
    <Radar
      data={dataForAllExceptLineChart}
      options={{
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Current State in ${country}`,
        },
      }}
    />
  ) : null; //False case

  //Line Chart
  const lineChart = dailyCovidData[0] ? (
    <Line
      data={{
        labels: dailyCovidData.map(({ date }) => date),
        datasets: [
          {
            data: dailyCovidData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyCovidData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5",
            fill: true,
          },
        ],
      }}
    />
  ) : null; //False case

  const chartToSend = () => {
    switch (chartType) {
      case "Line (Global Data)":
        return lineChart;
      case "Bar":
        return barChart;
      case "HorizontalBar":
        return horizontalBarChart;
      case "Doughnut":
        return donughtChart;
      case "Pie":
        return pieChart;
      case "Polar":
        return polarChart;
      case "Radar":
        return radarChart;
      default:
        return lineChart;
    }
  };

  return (
    <div className={styles.container}>
      {!country || country == "Global" ? lineChart : chartToSend()}
    </div>
  );
};

export default Chart;
