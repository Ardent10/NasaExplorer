import { useAuth } from "@/modules/authentication/hooks";
import { ColorModeContext } from "@/modules/common/DarkMode";
import Footer from "@/modules/common/Layout/Footer";
import { useAppState } from "@/store";
import { AudioPlayer, BasicCard, Layout, Loader } from "@common/index";
import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNasa } from "../hooks";

const HomeScreen = () => {
  const [state] = useAppState();
  const { mode } = useContext(ColorModeContext);
  const { getAccount } = useAuth();
  const [nasaImageOfTheDay, setNasaImageOfTheDay] = useState<any>(null);
  const { fetchNasaImage } = useNasa();

  useEffect(() => {
    fetchNasaImageMemoized();
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      await getAccount();
    };
    fetchAccount();
  }, []);

  const fetchNasaImageMemoized = useMemo(() => {
    return async () => {
      const res = await fetchNasaImage();
      setNasaImageOfTheDay(res);
    };
  }, []); // Empty dependency array ensures that the function is memoized and won't change on re-renders

  return (
    <>
      <Layout>
        {state.isLoading ? (
          <Loader />
        ) : (
          <>
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
                    nasaImageOfTheDay?.hdurl
                      ? nasaImageOfTheDay.hdurl
                      : "/moon.jpg"
                  }
                  px={2}
                  py={0}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Layout>
    </>
  );
};

export default HomeScreen;
