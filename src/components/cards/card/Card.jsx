import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import styles from "./Card.css"; //Lets' write css first.

//Lets' rename our component
//so that it matches with our
//component diagram
const CovidCard = ({
  className,
  cardTitle,
  value,
  lastUpdate,
  cardSubtitle,
}) => (
  <Grid
    item
    xs={12}
    md={3}
    component={Card}
    className={cx(styles.card, className)}
  >
    <CardContent>
      <Typography color="textPrimary" gutterBottom>
        {cardTitle}
      </Typography>
      <Typography variant="h5" component="h2">
        <CountUp start={0} end={value} duration={2.75} separator="." />
      </Typography>
      <Typography color="textSecondary">
        {new Date(lastUpdate).toDateString()}
      </Typography>
      <Typography variant="body2" component="p">
        {cardSubtitle}
      </Typography>
    </CardContent>
  </Grid>
);

export default CovidCard;
