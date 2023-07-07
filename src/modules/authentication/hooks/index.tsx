import { useAppState } from "@/store";
import { globalApiCallHelper } from "@/utils/globalApiCallHelper";
import { useRouter } from "next/router";

interface SignupProps {
  email: string;
  password: string;
  username: string;
  location: string;
  dob: string;
  firstName: string;
  lastName: string;
}
interface LoginProps {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const [state, dispatch] = useAppState();

  const Signup = async ({
    email,
    password,
    username,
    location,
    dob,
    firstName,
    lastName,
  }: SignupProps) => {
    try {
      dispatch({
        type: "setIsLoading",
        payload: {
          isLoading: true,
        },
      });

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
          location,
          dob,
          firstName,
          lastName,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        dispatch({
          type: "setToggleSnackbar",
          payload: {
            open: true,
            severity: "success",
            message: "Account Created Successfully",
          },
        });
        router.push("/");
      } else {
        dispatch({
          type: "setToggleSnackbar",
          payload: {
            open: true,
            severity: "error",
            message: "Account Creation Failed",
          },
        });
      }
      dispatch({
        type: "setIsLoading",
        payload: {
          isLoading: false,
        },
      });
    } catch (error) {
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: "Account Creation Failed",
        },
      });
    } finally {
      dispatch({
        type: "setIsLoading",
        payload: {
          isLoading: false,
        },
      });
    }
  };

  const Login = async ({ email, password }: LoginProps) => {
    try {
      dispatch({
        type: "setIsLoading",
        payload: {
          isLoading: true,
        },
      });

      const res = await globalApiCallHelper({
        api: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email,
          password,
        },
      });

      console.log("RES", res);

      if (res._doc) {
        dispatch({
          type: "setToggleSnackbar",
          payload: {
            open: true,
            severity: "success",
            message: `Welcome to NasaExplorer`,
          },
        });
        dispatch({
          type: "setIsLoading",
          payload: {
            isLoading: false,
          },
        });
        router.push("/home");
      } else {
        dispatch({
          type: "setToggleSnackbar",
          payload: {
            open: true,
            severity: "error",
            message: "Login Failed",
          },
        });
      }
    } catch (error: any) {
      console.log("ERROR", error);
      // dispatch({
      //   type: "setToggleSnackbar",
      //   payload: {
      //     open: true,
      //     severity: "error",
      //     message: "Login Failed",
      //   },
      // });
      throw new Error(error);
    }
  };

  const getAccount = async () => {
    try {
      const res = await globalApiCallHelper({ api: "/auth/getAccount" });
      if (res.ok) {
        const data = await res.json();
        if (data.name && data.email && data.$id) {
          dispatch({
            type: "setUserProfile",
            payload: {
              ...data,
            },
          });
          // router.push("/home");
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      router.push("/");
    }
  };

  const Logout = async () => {
    try {
      await fetch("/user/logout", {
        method: "POST",
      });
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "success",
          message: "Logged Out Successfully.",
        },
      });
      router.push("/");
    } catch (error) {
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "success",
          message: "Logout Failed",
        },
      });
    }
  };

  return {
    Signup,
    Login,
    Logout,
    getAccount,
  };
}
