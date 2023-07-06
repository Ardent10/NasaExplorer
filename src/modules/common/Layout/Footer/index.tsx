import { Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link style={{ textDecoration: "none" }} href="/">
        NasaExplorer &nbsp;
      </Link>
      {new Date().getFullYear()}.
    </Typography>
  );
};
export default Footer;
