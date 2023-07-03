import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

interface Position {
  x: number;
  y: number;
}

const useStyles = makeStyles((theme) => ({
  spaceContainer: {
    backgroundImage: "url(space.avif)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  astronaut: {
    position: "absolute",
    transition: "all 0.3s ease",
  },
}));

const Astronaut: React.FC = () => {
  const classes = useStyles();
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.spaceContainer}
      onMouseMove={handleMouseMove}
    >
      <Grid item>
        <img
          src="astronaut.avif"
          alt="Astronaut"
          className={classes.astronaut}
          style={{ left: position.x, top: position.y }}
        />
      </Grid>
    </Grid>
  );
};

export default Astronaut;
