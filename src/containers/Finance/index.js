import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Table from "../../components/Table";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getFinanceReport } from "../../utils/api";
import { format } from "date-fns";

const columns = [
  { title: "Transaction Id", field: "id", grouping: false },
  { title: "Sender Name", field: "sender_name" },
  { title: "Reciever Name", field: "receiver_name" },
  { title: "Amount", field: "amount", grouping: false },
  {
    title: "Date",
    field: "timestamp",
    // type: "date",
    render: (rowData) => format(new Date(rowData.timestamp), "dd MMM yyyy"),
  },
  { title: "Payment Status", field: "payment_status", defaultGroupOrder: 0 },
];
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const initialDate = `${month}-01-${year}`;
export default function Finance() {
  const [startDate, setStartDate] = React.useState(new Date(initialDate));
  const [endDate, setEndDate] = React.useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const [financeList, setFinanceList] = useState([]);

  const fetchFinances = async () => {
    const res = await getFinanceReport(
      format(startDate, "yyyy-MM-dd"),
      format(endDate, "yyyy-MM-dd")
    );
    if (res && res.data.statusCode === 200) {
      setFinanceList(res.data.data);
    }
  };

  useEffect(() => {
    fetchFinances();
    return () => {};
  }, [startDate, endDate]);

  return (
    <div>
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
            maxDate={new Date()}
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
      <Table
        title="Finance Report"
        columns={columns}
        data={financeList}
        options={{
          grouping: true,
          // exportButton: true,
        }}
      />
    </div>
  );
}
