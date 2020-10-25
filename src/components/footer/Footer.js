import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Footer = () => {
  return (
    <Box
      style={{
        backgroundColor: "#5f6b72",
        width: "100%",
        height: 50,
        margin: 0
      }}
      align="center"
    >
      <Typography style={{ color: "#fff", padding: 13 }} variant="subtitle2">
        created @{" "}
        <a
          href="https://migueldias.net"
          style={{ textDecoration: "none", color: "#fff" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          migueldias.net
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
