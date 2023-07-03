import React from "react";
import { Grid, Typography, Link } from "@mui/material";

export const SpaceBg = () => {
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      bgcolor="rgb(18, 25, 48)"
      sx={{
        backgroundImage: "url(/moon.jpg)",
        // backgroundImage: "url(/loginBanner.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        objectFit: "cover",
        backgroundSize: "cover",
      }}
    >
      <Typography
        variant="body2"
        color="#FFF"
        align="center"
        fontWeight={600}
        p={3}
        position="absolute"
        right={0}
        bottom={0}
      >
        {"Copyright © "}
        <Link style={{ textDecoration: "none", color: "#FFF" }} href="/">
          NasaExplorer &nbsp;
        </Link>
        {new Date().getFullYear()}.
      </Typography>
    </Grid>
  );
};
