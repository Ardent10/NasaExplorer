import { ColorModeContext } from "@/modules/common/DarkMode";
import Footer from "@/modules/common/Layout/Footer";
import { useAppState } from "@/store";
import { BasicCard, Layout, ProfilePreview } from "@common/index";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const HomeScreen = () => {
  const [state] = useAppState();
  const { mode } = useContext(ColorModeContext);
  const [nasaImageOfTheDay, setNasaImageOfTheDay] = useState<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio("/interstellar.mp3");

    const playSoundtrack = () => {
      audio.play();
      setIsPlaying(true);
    };

    const pauseSoundtrack = () => {
      audio.pause();
      setIsPlaying(false);
    };

    const stopSoundtrack = () => {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    };

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    // Play or pause the audio based on the current state
    if (isPlaying) {
      playSoundtrack();
    } else {
      pauseSoundtrack();
    }

    // Clean up the audio event listeners when the component unmounts
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      stopSoundtrack();
    };
  }, [isPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (event: any, newValue: any) => {
    const audio = document.querySelector("audio");
    audio.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // fetch nasa image of the day from nasa apod api
  const fetchNasaImage = async () => {
    const res = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
    );
    const data = await res.json();
    setNasaImageOfTheDay(data);
    console.log(data);
  };

  useEffect(() => {
    fetchNasaImage();
  }, []);

  return (
    <>
      <Layout>
        <Box pt={11} pb={3} className="commonFlexStyle">
          <Typography variant="h2" fontWeight="bold">
            Nasa Image of the Day
          </Typography>
        </Box>
        <Grid
          container
          display="flex"
          justifyContent="center"
          bgcolor={mode === "light" ? "#f7f7f7" : ""}
        >
          <Grid item xs={2.5}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
              <Button
                onClick={togglePlayback}
                startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              >
                {isPlaying ? "Pause Soundtrack" : "Play Soundtrack"}
              </Button>
              <Box width={300} mt={2}>
                <Slider
                  value={currentTime}
                  max={duration}
                  onChange={handleSliderChange}
                  aria-label="Audio Slider"
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                width={300}
                mt={2}
              >
                <Typography>{formatTime(currentTime)}</Typography>
                <Typography>-{formatTime(duration - currentTime)}</Typography>
              </Box>
            </Box>
            <audio src="/interstellar.mp3" />
            <ProfilePreview />
            <Footer />
          </Grid>

          <Grid item xs={8}>
            <BasicCard title="" divider px={2} py={0}>
              <img
                src={
                  nasaImageOfTheDay?.hdurl
                    ? nasaImageOfTheDay.hdurl
                    : "/moon.jpg"
                }
                alt="nasa-img"
                width={"100%"}
              />
            </BasicCard>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default HomeScreen;
