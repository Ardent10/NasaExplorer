import { useAppState } from "@/store";
export function useNasa() {
  // fetch nasa image of the day from nasa apod api
  const [state, dispatch] = useAppState();
  const fetchNasaImage = async () => {
    try {
      dispatch({
        type: "setIsLoading",
        payload: {
          isLoading: true,
        },
      });

      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
      );
      const data = await res.json();

      dispatch({
        type: "setIsLoading",
        payload: {
          isLoading: false,
        },
      });

      return data;
    } catch (error) {
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: "Nasa Image Fetch Failed",
        },
      });
    }
  };

  return {
    fetchNasaImage,
  };
}
