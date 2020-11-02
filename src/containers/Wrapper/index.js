import React from "react";
import PropTypes from "prop-types";
import NavBar from "../NavBar";
import { Box, Container } from "@material-ui/core";

export default function Wrapper({ children }) {
  return (
    <div>
      <NavBar />
      <Box px={4} py={4}>
        {children}
      </Box>
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.element,
};
