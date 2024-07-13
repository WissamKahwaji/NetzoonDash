import { Box, Button, CircularProgress } from "@mui/material";
import TProps from "./type";

const LoadingButton = ({
  isSubmitting,
  type = "submit",
  buttonText,
  ...props
}: TProps) => {
  return (
    <Box sx={{ position: "relative", m: "auto" }}>
      <Button
        {...props}
        variant="contained"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        type={type}
      >
        {isSubmitting ? (
          <Box
            component={"span"}
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress
              color="secondary"
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />{" "}
            {buttonText}
          </Box>
        ) : (
          buttonText
        )}
      </Button>
    </Box>
  );
};

export default LoadingButton;
