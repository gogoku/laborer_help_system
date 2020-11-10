import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addNewCard, getCardsList, makePayment } from "../../utils/api";
import {
  Backdrop,
  capitalize,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const cardsListInitial = [];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  cardField: {
    marginBottom: theme.spacing(1),
  },
  expiryField: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "18ch",
  },
  cvvField: {
    marginBottom: theme.spacing(1),
    width: "12ch",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const displayCard = (cardValue) => {
  let val = cardValue;
  if (cardValue.length > 4 && cardValue.length < 9) {
    val = val.slice(0, 4) + " " + val.slice(4, cardValue.length);
  } else if (cardValue.length > 8 && cardValue.length < 13) {
    val =
      val.slice(0, 4) +
      " " +
      val.slice(4, 8) +
      " " +
      val.slice(8, cardValue.length);
  } else if (cardValue.length > 12) {
    val =
      val.slice(0, 4) +
      " " +
      val.slice(4, 8) +
      " " +
      val.slice(8, 12) +
      " " +
      val.slice(12, cardValue.length);
  }
  return val;
};

const displayExpiry = (expValue) => {
  let val = expValue;
  if (val.length > 2) {
    val = val.slice(0, 2) + "/" + val.slice(2, val.length);
  }
  return val;
};

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

function SuccessAlert(props) {
  return <MuiAlert elevation={6} {...props} severity="success" />;
}

const CardRow = ({ card }) => {
  return (
    <div>
      <Typography display="inline">{card.name} &nbsp;</Typography>
      <Typography display="inline">{displayCard(card.card_number)}</Typography>
      <Typography>{displayExpiry(card.expiry_date)}</Typography>
    </div>
  );
};

const Payments = () => {
  const classes = useStyles();
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedCard, selectCard] = useState({});
  const [selectedCardCVV, setSelectedCardCVV] = useState("");
  const [addView, setAddView] = useState(false);
  const [cardsList, setcardsList] = useState(cardsListInitial);
  const [tipAmount, setTipAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const history = useHistory();
  const laborer = { ...history.location.state.laborer };

  const fetchCardsList = async () => {
    try {
      const res = await getCardsList();
      if (res && res.data.statusCode === 200) {
        setcardsList(res.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCardsList();
  }, []);

  const handleTipInput = (event) => {
    let val = event.target.value;
    if (val === "") {
      setTipAmount(val);
    } else if (Number(val)) {
      setTipAmount(val);
    }
  };

  const handleNameInput = (ev) => {
    setName(ev.target.value);
  };

  const handleCardInput = (event) => {
    let val = event.target.value;
    val = val.replace(/\ /g, "");
    if (val === "") {
      setCard(val);
    } else if (Number(val) && val.length <= 16) {
      setCard(val);
    }
  };
  const handleExpiryInput = (event) => {
    let val = event.target.value;
    val = val.replace(/\//g, "");
    if (val === "") {
      setExpiry(val);
    } else if (Number(val) && val.length <= 4) {
      setExpiry(val);
    }
  };
  const handleCvvInput = (event) => {
    let val = event.target.value;
    if (val === "") {
      setCvv(val);
    } else if (Number(val) && val.length <= 3) {
      setCvv(val);
    }
  };

  const handleCurrentCardCvvInput = (event) => {
    let val = event.target.value;
    if (val === "") {
      setSelectedCardCVV(val);
    } else if (Number(val) && val.length <= 3) {
      setSelectedCardCVV(val);
    }
  };

  const handleCardSelect = (event) => {
    const val = event.target.value;
    if (selectedCard.card_number !== val) {
      setSelectedCardCVV("");
    }
    const index = cardsList.findIndex((card) => card.card_number === val);
    selectCard(cardsList[index]);
  };

  const toggleAddCard = () => {
    setAddView(!addView);
  };

  const handleAddCard = async (ev) => {
    ev.preventDefault();
    const data = {
      name: name,
      card_number: card,
      expiry_date: expiry,
      cvv: cvv,
    };
    try {
      const res = await addNewCard(data);
      if (res && res.data.statusCode === 201) {
        setSuccessMessage("Successfully Added Card");
        resetAddCard();
      } else {
        setFailureMessage("Failed to add card");
      }
    } catch (error) {
      setFailureMessage("Failed to add card");
    }
  };

  const handlePayTip = async (ev) => {
    ev.preventDefault();
    setSubmitting(true);
    const data = {
      amount: Number(tipAmount),
      card_id: selectedCard.card_number,
      labour_id: laborer.id,
    };
    try {
      const res = await makePayment(data);
      if (res && res.data.statusCode === 200) {
        setSubmitting(false);
        setSuccessModal(true);
        setSuccessMessage("Successfully Paid");
      } else {
        setSubmitting(false);
        setFailureMessage("Payment Failed");
      }
    } catch (error) {
      setSubmitting(false);
      setFailureMessage("Payment Failed");
    }
  };

  const resetAddCard = () => {
    toggleAddCard();
    setCard("");
    setCvv("");
    setExpiry("");
    setName("");
  };

  const handleCloseAlert = () => {
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleCloseSuccessDialog = () => {
    history.goBack();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card>
          <CardHeader title="Saved Cards" />
          <CardContent>
            <List>
              {cardsList.map((card) => (
                <ListItem key={card.card_number}>
                  <ListItemIcon>
                    <Radio
                      edge="start"
                      checked={selectedCard.card_number === card.card_number}
                      color="primary"
                      value={card.card_number}
                      onChange={handleCardSelect}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={<CardRow card={card} />}
                    secondary={
                      selectedCard.card_number === card.card_number ? (
                        <TextField
                          placeholder="CVV"
                          type="password"
                          size="small"
                          value={selectedCardCVV}
                          onChange={handleCurrentCardCvvInput}
                        />
                      ) : null
                    }
                  ></ListItemText>
                </ListItem>
              ))}
              <ListItem key={"addNewCard"}>
                <ListItemText
                  primary={
                    <Button
                      onClick={toggleAddCard}
                      startIcon={<AddRoundedIcon />}
                    >
                      Add New Card
                    </Button>
                  }
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardHeader title={addView ? "Add Card" : "Tip Payment"} />
          {addView ? (
            <CardContent>
              <form onSubmit={handleAddCard}>
                <Grid item xs={12}>
                  <TextField
                    value={name}
                    id="cardholder-name"
                    label="Name on card"
                    required
                    // type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    className={classes.cardField}
                    onChange={handleNameInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={displayCard(card)}
                    id="tip-Card"
                    label="Card"
                    required
                    // type="number"
                    variant="outlined"
                    size="small"
                    fullWidth
                    className={classes.cardField}
                    onChange={handleCardInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="card-expiry"
                    label="Expiry"
                    required
                    value={displayExpiry(expiry)}
                    variant="outlined"
                    size="small"
                    className={classes.expiryField}
                    placeholder="MM/YY"
                    onChange={handleExpiryInput}
                  />
                  <TextField
                    id="card-CVV"
                    label="CVV"
                    required
                    // type="number"
                    variant="outlined"
                    size="small"
                    value={cvv}
                    className={classes.cvvField}
                    onChange={handleCvvInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button type="reset" onClick={resetAddCard} fullWidth>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        color="primary"
                        type="submit"
                        fullWidth
                        variant="contained"
                      >
                        Add Card
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          ) : (
            <CardContent>
              <form onSubmit={handlePayTip}>
                <Grid container justify="center">
                  <Grid item xs={6}>
                    <TextField
                      value={tipAmount}
                      id="tip-amount"
                      label="Amount"
                      required
                      // type="number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      className={classes.cardField}
                      onChange={handleTipInput}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">AED</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid container justify="center">
                    <Grid item xs={6}>
                      <Button
                        color="primary"
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={
                          !selectedCard.card_number ||
                          selectedCardCVV.length < 3 ||
                          !tipAmount
                        }
                      >
                        Pay
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          )}
        </Card>
      </Grid>
      <Backdrop className={classes.backdrop} open={submitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={!!failureMessage}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {capitalize(failureMessage)}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SuccessAlert onClose={handleCloseAlert} severity="error">
          {capitalize(successMessage)}
        </SuccessAlert>
      </Snackbar>
      <Dialog
        open={successModal}
        onClose={handleCloseSuccessDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Transaction Update</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Transaction Success, Tip add to laborer
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Payments;
