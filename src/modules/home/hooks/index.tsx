export function useNasa() {
  // fetch nasa image of the day from nasa apod api
  const fetchNasaImage = async () => {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
    );
    const data = await res.json();
    return data;
  };

  return {
    fetchNasaImage,
  };
}
