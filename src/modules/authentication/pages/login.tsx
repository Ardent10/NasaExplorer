import { CustomSnackbar } from "@/modules/common";
import { Input } from "@/modules/common/Form/components/InputField";
import { useAppState } from "@/store";
import { PrimaryButton } from "@common/index";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { LoginSchema } from "@utils/validations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { OAuth } from "../components/OAuth";
import { SpaceBg } from "../components/SpaceBg";
import { useAuth } from "../hooks";

export function LoginScreen() {
  const router = useRouter();
  const { getAccount, Login } = useAuth();
  const [state, dispatch] = useAppState();

  const defaultValues = {
    email: "john@devverse.com",
    password: "Test@123",
    remember: true,
  };

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const fetchAccount = async () => {
      await getAccount();
    };
    fetchAccount();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    await Login({ email: data.email, password: data.password });
  });

  return (
    <>
      <CustomSnackbar
        open={state.toggleSnackbar.open}
        severity={
          state.toggleSnackbar.severity == "success" ? "success" : "info"
        }
        message={state.toggleSnackbar.message}
        vertical="top"
        horizontal="right"
      />
      <Grid container height="100vh" display="flex">
        <Grid
          item
          container
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={12}
          sm={8}
          md={5}
        >
          <Grid item container p={8} justifyContent="center" rowSpacing={2}>
            <Grid item container xs={10} rowSpacing={2}>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="h5"
                  fontSize={60}
                  fontWeight={600}
                  textAlign="center"
                >
                  Hi there!
                </Typography>
                <Typography textAlign="center">
                  Explore the universe with NasaExplorer.
                </Typography>
              </Grid>

              <Grid item xs={12}className="commonFlexStyle">
                <OAuth label="Login With Google" onClick={()=>{}}/>
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  px={15}
                >
                  <Divider style={{ flexGrow: 1 }} />
                  <Typography variant="body1" style={{ margin: "0 10px" }}>
                    or
                  </Typography>
                  <Divider style={{ flexGrow: 1 }} />
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={9} rowSpacing={2}>
              <form onSubmit={onSubmit}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12}>
                    <Input
                      name="email"
                      control={control}
                      type="text"
                      placeholder="Enter Email*"
                      disable={false}
                      inputHeadingType="Bold"
                      inputHeadingLabel="Email"
                      inputFieldPadding={2}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      name="password"
                      control={control}
                      type="password"
                      placeholder="Password*"
                      disable={false}
                      inputHeadingType="Bold"
                      inputHeadingLabel="Password"
                      required
                      inputHeadingLabelFontSize={14}
                      inputFieldPadding={2}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={8}>
                      <FormControlLabel
                        control={
                          <Controller
                            name="remember"
                            control={control}
                            render={({ field }) => {
                              return (
                                <Checkbox
                                  checked={true}
                                  {...field}
                                  sx={{
                                    "&.Mui-checked": {
                                      color: "#0f0da1",
                                    },
                                  }}
                                />
                              );
                            }}
                          />
                        }
                        label="Remember me"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#0f0da1",
                          fontSize: "12px",
                        }}
                        href="/"
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    justifyContent="center"
                    mt={1}
                  >
                    <PrimaryButton
                      fontSize={12}
                      fontWeight={500}
                      title="Login"
                      type="submit"
                      borderColor="1px solid #0f0da1"
                      borderRadius="28px"
                      height={45}
                      width={390}
                      showLoaderonBtn={true}
                    />
                  </Grid>
                </Grid>
              </form>
              <Grid item xs={12} mt={2} className="commonFlexStyle">
                Don't have an account? &nbsp;
                <Link
                  href="/signup"
                  style={{ textDecoration: "none", color: "#0f0da1" }}
                >
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SpaceBg />
      </Grid>
    </>
  );
}
