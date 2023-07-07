import { ColorModeContext } from "@/modules/common/DarkMode";
import Footer from "@/modules/common/Layout/Footer";
import { useAppState } from "@/store";
import { AudioPlayer, BasicCard, Layout } from "@common/index";
import { Box, Grid, Typography } from "@mui/material";
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
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={2.5}>
            <AudioPlayer />
            {/* <ProfilePreview /> */}
            <BasicCard
              title={nasaImageOfTheDay?.title}
              author={nasaImageOfTheDay?.copyright}
              date={nasaImageOfTheDay?.date}
              desc={nasaImageOfTheDay?.explanation}
              py={2}
            />
            <Footer />
          </Grid>

          <Grid item xs={8}>
            <BasicCard
              title=""
              cardMedia={
                nasaImageOfTheDay?.hdurl ? nasaImageOfTheDay.hdurl : "/moon.jpg"
              }
              px={2}
              py={0}
            />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default HomeScreen;
