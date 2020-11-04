import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red, blueGrey, teal, cyan, lime } from "@material-ui/core/colors";
import WhatshotTwoToneIcon from "@material-ui/icons/WhatshotTwoTone";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";
import AirlineSeatReclineNormalRoundedIcon from "@material-ui/icons/AirlineSeatReclineNormalRounded";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  statRow: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statContainer: {
    padding: "1em 5em",
    textAlign: "center",
  },
  valueContainer: {
    display: "flex",
    alignItems: "center",
  },
  titleStat: {
    fontSize: "1em",
  },
  valueStat: {
    fontSize: "2em",
  },
});

export default function LaborerStats({ summary }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.statRow}>
        <div className={classes.statContainer}>
          <div>
            <Typography className={classes.titleStat} color={"textSecondary"}>
              Steps
            </Typography>
          </div>
          <div className={classes.valueContainer}>
            <DirectionsRunRoundedIcon style={{ color: cyan[500] }} />
            <Typography className={classes.valueStat}>
              {summary.steps}
            </Typography>
          </div>
        </div>
        <div className={classes.statContainer}>
          <div>
            <Typography className={classes.titleStat}>Calories</Typography>
          </div>
          <div className={classes.valueContainer}>
            <WhatshotTwoToneIcon style={{ color: red[500] }} />
            <Typography className={classes.valueStat}>
              {summary.calories} kcal
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.statRow}>
        <div className={classes.statContainer}>
          <div>
            <Typography color={"textSecondary"} className={classes.titleStat}>
              Distance
            </Typography>
          </div>
          <div className={classes.valueContainer}>
            <LocationOnRoundedIcon style={{ color: teal[500] }} />
            <Typography className={classes.valueStat}>
              {summary.distance} km
            </Typography>
          </div>
        </div>
        <div className={classes.statContainer}>
          <div>
            <Typography color={"textSecondary"} className={classes.titleStat}>
              Sendentary Time
            </Typography>
          </div>
          <div className={classes.valueContainer}>
            <AirlineSeatReclineNormalRoundedIcon
              style={{ color: blueGrey[300] }}
            />
            <Typography className={classes.valueStat}>
              {summary.idleTime} mins
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

LaborerStats.propTypes = {
  summary: PropTypes.object,
};

LaborerStats.defaultProps = {
  summary: {},
};
