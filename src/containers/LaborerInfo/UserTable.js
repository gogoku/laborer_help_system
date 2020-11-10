import React, { useState, useEffect } from "react";
import { IconButton, colors } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import PropTypes from "prop-types";
import Table, { tableIcons } from "../../components/Table";
import { getLaborers } from "../../utils/api";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Designation",
    field: "designation",
  },
];

const data = [{ name: "Mehmet", project: "12345", fit: "Yes" }];

export default function UserTable({ selectLaborer, laborerList }) {
  return (
    <Table
      columns={columns}
      data={laborerList}
      title="Laborers"
      actions={[
        {
          icon: tableIcons.Asses,
          tooltip: "User Data",
          onClick: (event, rowData) => selectLaborer(rowData),
        },
      ]}
      options={{
        actionsColumnIndex: -1,
        minBodyHeight: window.innerHeight - 208,
        pageSize: 10,
      }}
    />
  );
}

UserTable.propTypes = {
  selectLaborer: PropTypes.func,
};

UserTable.defaultProps = {
  selectLaborer: () => {},
};
