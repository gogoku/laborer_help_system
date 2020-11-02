import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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

const tipList = [
  { date: "22nd May", amount: "20" },
  { date: "22nd Jun", amount: "15" },
  { date: "22nd Jul", amount: "10" },
  { date: "22nd Aug", amount: "5" },
  { date: "22nd Sept", amount: "30" },
  { date: "22nd Oct", amount: "10" },
];

const TipHistory = ({ tip }) => {
  const classes = useStyles();
  return (
    <div className={classes.tipRow}>
      <div>{tip.date}</div>
      <div>{tip.amount} $</div>
    </div>
  );
};

export default function Tips() {
  const classes = useStyles();
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
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.tipAddRow}>
          <TextField id="tip-amount" label="Amount" required type="number" />
          <Button
            size="medium"
            color="primary"
            type="submit"
            variant="contained"
          >
            Pay
          </Button>
        </div>
      </form>
    </div>
  );
}
