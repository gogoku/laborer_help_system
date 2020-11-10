import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Payments from "../Payments";
import { useHistory } from "react-router-dom";
import { getTipHistory } from "../../utils/api";
import { format } from "date-fns";

const useStyles = makeStyles({
  tipRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
  },
  tipTitle: {
    padding: "8px 16px",
  },
  tipAddRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "8px 16px",
  },
});

const initialTipList = [];

const TipHistory = ({ tip }) => {
  const classes = useStyles();
  return (
    <div className={classes.tipRow}>
      <div>{format(new Date(tip.timestamp), "dd MMM yy")}</div>
      <div>{tip.amount} AED</div>
    </div>
  );
};

export default function Tips({ laborer }) {
  const [tipList, setTipList] = useState(initialTipList);
  const classes = useStyles();
  const history = useHistory();

  const navigateToPayments = () => {
    debugger;
    history.push("/payment", { laborer });
  };

  const fetchTipList = async () => {
    console.log(laborer, "i am called");
    const res = await getTipHistory(laborer.id);
    if (res && res.data.statusCode === 200) {
      setTipList(res.data.data);
    }
  };

  useEffect(() => {
    fetchTipList();
    return undefined;
  }, []);

  return (
    <div>
      <Typography color="textSecondary" className={classes.tipTitle}>
        Tip History
      </Typography>
      <div>
        {tipList.map((tip) => (
          <TipHistory key={tip.date} tip={tip} />
        ))}
      </div>
      <div className={classes.tipAddRow}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={navigateToPayments}
        >
          Add Tip
        </Button>
      </div>
    </div>
  );
}
