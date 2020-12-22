import React from "react";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        marginTop: "15px",
        height: "55px"
      }}
      align="center"
    >
      <Typography
        style={{
          color: "#3c4858",
          padding: 13,
          fontFamily: "Roboto",
          fontSize: "17px"
        }}
        variant="subtitle2"
      >
        created @{" "}
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
