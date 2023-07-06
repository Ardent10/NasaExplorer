import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        {isPlaying ? (
          <Button onClick={handlePause} disabled={!isPlaying}>
            <PauseIcon />
            <Typography>Pause Interstellar</Typography>
          </Button>
        ) : (
          <Button onClick={handlePlay} disabled={isPlaying}>
            <PlayArrowIcon />
            <Typography>Play Interstellar</Typography>
          </Button>
        )}
        <Slider
          value={currentTime}
          max={duration}
          // onChange={handleSeek}
          aria-label="Audio Slider"
        />
        <Box display="flex" justifyContent="space-between" width={300}>
          <Typography>{formatTime(currentTime)}</Typography>
          <Typography>-{formatTime(duration - currentTime)}</Typography>
        </Box>
      </Box>
      <ReactPlayer
        url="/interstellar.mp3"
        playing={isPlaying}
        onProgress={handleProgress}
        style={{ display: "none" }}
      />
    </div>
  );
};
