import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackRounded from "@material-ui/icons/ArrowBackRounded";
import PropTypes from "prop-types";
import HeartRateChart from "./HeartRateChart";
import { useHistory } from "react-router-dom";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import LaborerStats from "./LabourerStats";
import Tips from "./Tips";
import { fetchLaborerStats } from "../../utils/api";
import { format } from "date-fns";

const useStyles = makeStyles({
  cardRoot: {
    width: "100%",
    marginTop: "1em",
  },
  item: {
    display: "flex",
  },
  title: {
    marginRight: "3em",
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
  width80: {
    width: "80%",
  },
  tipContainer: {
    marginLeft: "1em",
    marginTop: "5em",
    width: "20%",
  },
});

const statsInitial = {
  heartRateData: [],
  summary: { steps: "", calories: "", distance: "", idleTime: "" },
};

export default function LaborerDetailed() {
  const history = useHistory();
  const classes = useStyles();
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [stats, setstats] = useState(statsInitial);
  const laborer = { ...history.location.state.laborer };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const fetchUserStats = async () => {
    if (laborer.id) {
      const res = await fetchLaborerStats(
        laborer.id,
        format(startDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd")
      );
      const data = res.data.data;
      // setstats({
      // heartRateData: data.heart_rate["activities-heart-intraday"].dataset.map(
      //   ({ time, value }) => ({
      //     time: getTimeStamp(time),
      //     value,
      //   })
      // ),
      // summary: {
      //   steps: data.activity.summary.steps,
      //   idleTime: data.activity.summary.sedentaryMinutes,
      //   calories: data.activity.summary.caloriesOut,
      //   distance: data.activity.summary.distances[0].distance,
      // },
      // });
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, []);

  useEffect(() => {
    fetchUserStats();
  }, [startDate, endDate]);

  return (
    <div>
      <div>
        <Button
          startIcon={<ArrowBackRounded />}
          size="small"
          onClick={history.goBack}
        >
          Back
        </Button>
      </div>

      <Card className={`${classes.cardRoot}`}>
        <CardContent>
          <div className={classes.item}>
            <Typography className={classes.title}>
              Name: {laborer.name}
            </Typography>
            <Typography className={classes.title}>
              Designation: {laborer.designation}
            </Typography>
            <Typography className={classes.title}>
              Phone: {`${laborer.country_code} ${laborer.phone}`}
            </Typography>
            <Typography className={classes.title}>
              Email: {laborer.email}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <div className={classes.item}>
        <div className={classes.width80}>
          <div className={classes.item}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="flex-end">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="start-date"
                  label="Start Date"
                  value={startDate}
                  maxDate={endDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  margin="normal"
                  variant="inline"
                  id="end-date"
                  label="End Date"
                  format="dd/MM/yyyy"
                  value={endDate}
                  minDate={startDate}
                  maxDate={new Date()}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
          <Card className={`${classes.cardRoot}`}>
            <CardContent>
              <Typography color="textSecondary">
                Heart Rate <Typography variant="caption">(Bpm)</Typography>
              </Typography>
              <HeartRateChart />
            </CardContent>
          </Card>
          <Card className={`${classes.cardRoot}`}>
            <CardContent>
              <Typography color="textSecondary">Stats</Typography>
              <LaborerStats summary={stats.summary} />
            </CardContent>
          </Card>
        </div>
        <div className={classes.tipContainer}>
          <Card className={`${classes.cardRoot}`}>
            <CardContent>
              <Tips />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

LaborerDetailed.propTypes = {
  laborer: PropTypes.object,
};
