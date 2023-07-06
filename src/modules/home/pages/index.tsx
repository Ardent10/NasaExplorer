import { ColorModeContext } from "@/modules/common/DarkMode";
import Footer from "@/modules/common/Layout/Footer";
import { useAppState } from "@/store";
import { BasicCard, Layout, ProfilePreview, AudioPlayer } from "@common/index";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Grid, Slider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const HomeScreen = () => {
  const [state] = useAppState();
  const { mode } = useContext(ColorModeContext);
  const [nasaImageOfTheDay, setNasaImageOfTheDay] = useState<any>(null);



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

        >
          <Grid item xs={2.5}>
            <AudioPlayer/>
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
