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
        localStorage.setItem("auth_token", res.accessToken);
        dispatch({
          type: "setToggleSnackbar",
          payload: {
            open: true,
            severity: "success",
            message: `Welcome to NasaExplorer`,
          },
        });
        dispatch({
          type: "setUserProfile",
          payload: {
            firstName: res._doc.firstName,
            lastName: res._doc.lastName,
            email: res._doc.email,
            username: res._doc.username,
            location: res._doc.location,
            dob: res._doc.dob,
            $id: res._doc.$id,
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
      dispatch({
        type: "setToggleSnackbar",
        payload: {
          open: true,
          severity: "error",
          message: "Login Failed",
        },
      });
    }
  };

  const getAccount = async () => {
    try {
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        console.log("Access token not found.");
      }

      const res = await globalApiCallHelper({
        api: "/auth/getAccount",
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("get account RES", res);
      if (res._id) {
        dispatch({
          type: "setUserProfile",
          payload: {
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            username: res.username,
            location: res.location,
            dob: res.dob,
            $id: res._id,
          },
        });
        // router.push("/home");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log("Get Account ERROR: ", error);
      // router.push("/");
    }
  };

  const Logout = async () => {
    try {
      localStorage.removeItem("accessToken");
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
