import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import styles from "./styles.module.css";
import LaborerBrief from "./LaborerBrief";
import { Button, capitalize, Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { settleBalance, getBalance, getLaborers } from "../../utils/api";
import { useCookies } from "react-cookie";

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

function SuccessAlert(props) {
  return <MuiAlert elevation={6} {...props} severity="success" />;
}

let settleMessage = "";

export default function LaborerInfo() {
  const [laborer, selectLaborer] = useState({});
  const [settleStatus, setSettleStatus] = useState("");
  const [balance, setBalance] = useState("");
  const [userCookies, setUserCookie] = useCookies(["user"]);

  const [laborerList, setLaborerList] = useState([]);

  const fetchLaborers = async () => {
    const res = await getLaborers();
    if (res && res.data) {
      selectLaborer(res.data.data[0]);
      setLaborerList(res.data.data);
    }
  };

  const handleSettleBalance = async () => {
    setSettleStatus("processing");
    try {
      const res = await settleBalance();
      if (res && res.data.statusCode === 201) {
        settleMessage = "Successfully settled balance";
        setSettleStatus("success");
        fetchBalance();
        fetchLaborers();
      } else {
        settleMessage = "Failed to settle balance, Please try again";
        setSettleStatus("failed");
      }
    } catch (error) {
      settleMessage = "Failed to settle balance, Please try again";
      setSettleStatus("failed");
    }
  };

  const fetchBalance = async () => {
    const res = await getBalance();
    if (res && res.data.statusCode === 200) {
      setBalance(res.data.data);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchLaborers();
    return () => {};
  }, []);

  const handleCloseAlert = () => {
    settleMessage = "";
    setSettleStatus("");
  };

  return (
    <div>
      {userCookies?.user?.permission === "MANAGER" && (
        <div className={styles.balanceContainer}>
          <Button
            onClick={handleSettleBalance}
            color="primary"
            disabled={settleStatus === "processing"}
          >
            Settle Laborer Balance
          </Button>
          <Typography display="inline">
            Account Balance: {balance}
            <Typography variant="caption"> AED</Typography>
          </Typography>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.componentContainer}>
          <UserTable laborerList={laborerList} />
        </div>
        <div className={styles.componentContainer}>
          <LaborerBrief laborer={laborer} />
        </div>
      </div>
      <Snackbar
        open={settleStatus === "failed"}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {capitalize(settleMessage)}
        </Alert>
      </Snackbar>

      <Snackbar
        open={settleStatus === "success"}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SuccessAlert onClose={handleCloseAlert} severity="error">
          {capitalize(settleMessage)}
        </SuccessAlert>
      </Snackbar>
    </div>
  );
}
