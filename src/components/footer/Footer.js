import React from "react";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        position: "fixed",
        bottom: 0,
        width: "100%",
        marginLeft: -8,
        height: 20
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
        @{" "}
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
