import { useAuth } from "@/modules/authentication/hooks";
import { useAppState } from "@/store";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ColorModeContext } from "../DarkMode";
import { Loader } from "../Loder";
import { CustomSnackbar } from "../Snackbar";
import Footer from "./Footer";
import Header from "./Header";

const drawerWidth = 240;

interface props {
  children: any;
  menuItems?: Array<any>;
  footer?: boolean;
}

export function Layout(props: props) {
  const [state, dispatch] = useAppState();
  const { getAccount } = useAuth();
  const { globalReducer } = state;
  const theme = useTheme();

  const { mode } = useContext(ColorModeContext);

  const router = useRouter();

  // useEffect(() => {
  //   const fetchAccount = async () => {
  //     await getAccount();
  //   };
  //   fetchAccount();
  // }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: "setIsLoading",
  //     payload: {
  //       isLoading: true,
  //     },
  //   });

  //   const timeout = setTimeout(() => {
  //     dispatch({
  //       type: "setIsLoading",
  //       payload: { isLoading: false },
  //     });
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <>
      <CustomSnackbar
        open={state.toggleSnackbar.open}
        severity={
          state.toggleSnackbar.severity == "success" ? "success" : "error"
        }
        message={state.toggleSnackbar.message}
        vertical="top"
        horizontal="right"
      />
      <Box>
        <Header mode={mode} />

        <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
          {state?.isLoading ? <Loader /> : props.children}
        </Box>
        {props.footer && <Footer />}
      </Box>
    </>
  );
}
