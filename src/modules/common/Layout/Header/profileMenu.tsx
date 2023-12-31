import { useAuth } from "@/modules/authentication/hooks";
import { useAppState } from "@/store/index";
import { CustomTooltip } from "@common/index";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import * as React from "react";
import { sxStyles } from "./index.styles";

export default function AccountMenu() {
  const [state] = useAppState();
  const [userFullName, setUserFullName] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const styles = sxStyles();
  const { Logout } = useAuth();

  async function handleLogout() {
    await Logout();
  }

  React.useEffect(() => {
    if (state?.userProfile?.firstName && state?.userProfile?.lastName) {
      setUserFullName(
        state?.userProfile?.firstName + " " + state?.userProfile?.lastName
      );
    }
  }, [state?.userProfile?.firstName, state?.userProfile?.lastName]);

  const router = useRouter();

  return (
    <>
      <CustomTooltip label="Profile Menu" placement="bottom">
        <Box
          display="flex"
          alignItems="center"
          textAlign="center"
          border="1px solid #8a89fa"
          borderRadius={2}
          onClick={handleClick}
        >
          <Typography color="#8a89fa" fontWeight={600} p={1}>
            {userFullName ? userFullName : ""}
          </Typography>
          <IconButton
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt="profile-icon"
              src="/Images/boy.png"
              sx={{ width: 35, height: 35 }}
            />
          </IconButton>
        </Box>
      </CustomTooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: styles.menuStyle,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar
            alt="profile-icon"
            src="/Images/boy.png"
            sx={{ width: 35, height: 35 }}
          />
          Profile
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
