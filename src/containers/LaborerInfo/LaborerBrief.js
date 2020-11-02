import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import PropTypes from "prop-types";
import format from "date-fns/format";
import HeartRateChart from "./HeartRateChart";
import LaborerStats from "./LabourerStats";
import { useHistory } from "react-router-dom";
import { fetchIntraDayStats } from "../../utils/api";
import { getTimeStamp } from "../../utils/helpers";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: window.innerHeight - 92,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});

const statsInitial = {
  heartRateData: [],
  summary: { steps: "", calories: "", distance: "", idleTime: "" },
};

export default function LaborerBrief({ laborer }) {
  const classes = useStyles();
  const history = useHistory();
  const [stats, setstats] = useState(statsInitial);

  const fetchUserStats = async () => {
    if (laborer.id) {
      const res = await fetchIntraDayStats(laborer.id);
      const data = res.data.data;
      setstats({
        heartRateData: data.heart_rate["activities-heart-intraday"].dataset.map(
          ({ time, value }) => ({
            time: getTimeStamp(time),
            value,
          })
        ),
        summary: {
          steps: data.activity.summary.steps,
          idleTime: data.activity.summary.sedentaryMinutes,
          calories: data.activity.summary.caloriesOut,
          distance: data.activity.summary.distances[0].distance,
        },
      });
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, [laborer]);

  const navigateToDetails = () => {
    history.push("/detail_view", { laborer });
  };

  return (
    <Card className={`${classes.root} MuiPaper-elevation2`}>
      <CardContent>
        <Typography variant="caption" color="textSecondary" gutterBottom>
          {format(new Date(), "dd-MMM-yyyy")}
        </Typography>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          Name: {laborer.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Designation: {laborer.designation}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Contact: {`${laborer.country_code} ${laborer.phone}`}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Email: {laborer.email}
        </Typography>
        <Typography color="textSecondary">Heart Rate</Typography>
        <HeartRateChart laborer={laborer} heartRateData={stats.heartRateData} />
        <Typography color="textSecondary" gutterBottom>
          Stats
        </Typography>
        <LaborerStats laborer={laborer} summary={stats.summary} />
      </CardContent>
      <CardActions>
        <Button
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={navigateToDetails}
          size="small"
        >
          Detailed
        </Button>
      </CardActions>
    </Card>
  );
}

LaborerBrief.propTypes = {
  laborer: PropTypes.object,
};
