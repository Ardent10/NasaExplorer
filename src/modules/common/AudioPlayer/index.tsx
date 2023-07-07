import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Slider } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { PrimaryButton } from "../PrimaryButton";

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleSeek = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      setCurrentTime(newValue);
    }
  };

  const handleProgress = (state: any) => {
    setCurrentTime(state.playedSeconds);
    setDuration(state.loadedSeconds);
  };

  return (
    <>
      <Box
        // sx={{ background: "linear-gradient(to right, #000000, #0f0da1)" }}
        bgcolor="#272732"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        borderRadius={2}
      >
        {isPlaying ? (
          <PrimaryButton
            onClick={handlePause}
            // disabled={!isPlaying}
            title="Pause Interstellar"
            buttonChild={<PauseIcon />}
          />
        ) : (
          <PrimaryButton
            onClick={handlePlay}
            // disabled={isPlaying}
            title="Play Interstellar"
            buttonChild={<PlayArrowIcon />}
          />
        )}
        <Slider
          value={currentTime}
          max={duration}
          onChange={() => handleSeek}
          aria-label="Audio Slider"
        />
      </Box>
      <ReactPlayer
        url="/interstellar.mp3"
        playing={isPlaying}
        onProgress={handleProgress}
        style={{ display: "none" }}
      />
    </>
  );
};
