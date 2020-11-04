import React, { useState, useEffect } from "react";
import { IconButton, colors } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import Table, { tableIcons } from "../../components/Table";
import { addLaborer, getLaborers } from "../../utils/api";

import { capitalize } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

let additionErrorMessage = "";

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

function SuccessAlert(props) {
  return <MuiAlert elevation={6} {...props} severity="success" />;
}

const columns = [
  {
    title: "Name",
    field: "name",
    validate: (rowData) => (rowData.name === "" ? "Name cannot be empty" : ""),
  },
  {
    title: "Designation",
    field: "designation",
    validate: (rowData) =>
      rowData.designation === "" ? "Designation cannot be empty" : "",
  },
  {
    title: "Email",
    field: "email",
    validate: (rowData) =>
      rowData.email === "" ? "Email cannot be empty" : "",
  },
  {
    title: "Country Code",
    field: "country_code",
    validate: (rowData) =>
      rowData.country_code === "" ? "Country Code cannot be empty" : "",
  },
  {
    title: "Phone",
    field: "phone",
    validate: (rowData) =>
      rowData.phone === "" ? "Phone number cannot be empty" : "",
  },
  {
    title: "Fitbit",
    field: "code",
    editable: "onAdd",
    // eslint-disable-next-line react/display-name
    render: (rowData) => <CheckCircleIcon data={rowData} />,
    // eslint-disable-next-line react/display-name
    editComponent: (props) => <RegisterDevice {...props} />,
  },
];

const RegisterDevice = ({ onChange }) => {
  const onStorageUpdated = (ev) => {
    const token = localStorage.getItem("tracker_token");
    localStorage.removeItem("tracker_token");
    onChange(token);
  };
  const addToken = () => {
    window.addEventListener("storage", onStorageUpdated);
    window.open(
      "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22BT9C&redirect_uri=https://54.157.153.53/authenticate_device&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight",
      "_blank"
    );
  };

  return (
    <IconButton aria-label="add_fitbit" onClick={addToken}>
      <LibraryAddRoundedIcon />
    </IconButton>
  );
};

export default function ManageLabourer() {
  const [laborerList, setLaborerList] = useState([]);
  const [addUserStatus, setaddUserStatus] = useState("");

  const fetchLaborers = async () => {
    const res = await getLaborers();
    if (res && res.data) {
      setLaborerList(res.data.data);
    }
  };

  useEffect(
    () => {
      fetchLaborers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleCloseAlert = () => {
    additionErrorMessage = "";
    setaddUserStatus("");
  };

  return (
    <div>
      <Table
        columns={columns}
        data={laborerList}
        title="Laborers"
        // actions={[
        //   {
        //     icon: tableIcons.Delete,
        //     tooltip: "Delete User",
        //     onClick: (event, rowData) =>
        //       window.confirm("You want to delete " + rowData.name),
        //   },
        // ]}
        options={{
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              if (
                !newData.name ||
                !newData.designation ||
                !newData.country_code ||
                !newData.phone ||
                !newData.code ||
                !newData.email
              ) {
                setaddUserStatus("failed");
                reject();
              } else {
                const {
                  name,
                  designation,
                  country_code,
                  phone,
                  code,
                  email,
                } = newData;
                addLaborer({
                  name,
                  designation,
                  country_code,
                  phone,
                  code,
                  email,
                })
                  .then((res) => {
                    if (res && res.data.statusCode === 201) {
                      setaddUserStatus("success");
                      fetchLaborers();
                      resolve();
                    } else {
                      additionErrorMessage = "Failed to add laborer";
                      setaddUserStatus("failed");
                      reject();
                    }
                  })
                  .catch((err) => {
                    if (err && err.response) {
                      additionErrorMessage = err.response.data.message;
                    } else {
                      additionErrorMessage = "Failed to add laborer";
                    }
                    setaddUserStatus("failed");
                    reject();
                  });
              }
            }),
          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve, reject) => {
          //     if (!newData.name || !newData.project) {
          //       reject();
          //     } else {
          //       setTimeout(() => {
          //         //   setData([...data, newData]);
          //         resolve();
          //       }, 1000);
          //     }
          //   }),
        }}
      />
      <Snackbar
        open={addUserStatus === "failed"}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {capitalize(additionErrorMessage)}
        </Alert>
      </Snackbar>

      <Snackbar
        open={addUserStatus === "success"}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SuccessAlert onClose={handleCloseAlert} severity="error">
          Succefully added laborer
        </SuccessAlert>
      </Snackbar>
    </div>
  );
}
