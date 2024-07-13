import { Stack, Typography } from "@mui/material";

import { Link } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <Stack
      justifyContent={"center"}
      direction={"row"}
      alignItems={"center"}
      minHeight={"97vh"}
    >
      <Typography variant="h4" component={"h1"}>
        you are un authorized to access Netzoon Dashboard{" "}
        <Link to={"/sign-in"}>sign in</Link>{" "}
      </Typography>
    </Stack>
  );
};

export default UnAuthorized;
