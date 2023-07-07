import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

interface props {
  height?: number | string;
  width?: number;
  cardItems?: Array<any>;
  children?: any;
  px?: number;
  py?: number;
  title?: string;
  position?: "absolute" | "relative" | "fixed";
  cardAction?: boolean;
  cardMedia?: string;
  cardMediaheight?: number | string;
  cardMediaWidth?: number | string;
  divider?: boolean;
  buttonOnHeader?: boolean;
  btnOnClick?: any;
  btnLabel?: string;
  btnDisabled?: boolean;
  btnType?: string;
  author?: string;
  date?: string;
  desc?: string;
}

export function BasicCard(props: props) {

  return (
    <Grid container id="basic-card">
      <Grid item xs={12} px={props.px} py={props.py}>
        <Card
          sx={{
            minWidth: props.width ? props.width : "100%",
            height: props.height,
            position: props?.position,
            padding: 2,
          }}
        >
          {props.cardMedia && (
            <CardMedia
              component="img"
              sx={{
                width: props.cardMediaWidth,
              }}
              image={props.cardMedia}
              title="icon"
            />
          )}
          <CardContent>
            <Box gap={1}>
              <Typography sx={{ fontSize: 18, fontWeight: 500 }} gutterBottom>
                {props.title}
              </Typography>
              {props.author && <Typography>By: {props.author}</Typography>}
              {props.date && (
                <Typography gutterBottom>Date: {props.date}</Typography>
              )}
            </Box>
            {props.desc && (
              <Typography variant="body2" color="text.secondary">
                {props.desc}
              </Typography>
            )}
            {props.children}
          </CardContent>
          {props.cardAction && (
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}