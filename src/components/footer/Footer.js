import React from "react";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        position: "relative",
        bottom: 0,
        width: "!important 100%",
        height: 20,
        marginTop: 20,
        marginBottom: -10,
        marginLeft: -10,
        marginRight: -10
      }}
      align="center"
    >
      <Typography
        style={{
          color: "#3c4858",
          fontFamily: "Roboto",
          fontSize: "12px"
        }}
        variant="subtitle2"
      >
       created by @{" "}
        <a
          href="https://migueldias.net"
          style={{ textDecoration: "none", color: "#3c4858" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          migueldias.net
        </a>
      </Typography>
    </div>
  );
};

export default Footer;
