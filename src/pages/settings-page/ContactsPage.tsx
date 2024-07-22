import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ContactsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
          color: "black",
        }}
      >
        {t("contacts")}
      </Typography>
      <Grid container gap={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("opinions")}
              fullWidth
              sx={{ mb: 1 }}
            >
              {t("opinions")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("complaints")}
              fullWidth
              sx={{ mb: 1 }}
            >
              {t("complaints")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("questions")}
              fullWidth
              sx={{ mb: 1 }}
            >
              {t("questions")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("requests")}
              fullWidth
              sx={{ mb: 1 }}
            >
              {t("requests")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactsPage;
