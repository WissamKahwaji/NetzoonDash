import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CountryPicker from "../../components/items/buttons/countryPicker";

const SettingsPage = () => {
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
        {t("more")}
      </Typography>
      <Grid container gap={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("contacts")}
              fullWidth
              sx={{ mb: 1 }}
            >
              {t("contacts")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("privacy-policy")}
              fullWidth
              sx={{ mb: 1 }}
            >
              {t("privacy_policy")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("termsofuse")}
              fullWidth
              sx={{ mb: 1 }}
            >
              {t("terms_of_use")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("ads-revenues")}
              fullWidth
              sx={{ mb: 1 }}
            >
              {t("advertising_revenues")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box p={1}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("fees")}
              fullWidth
              sx={{ mb: 1 }}
            >
              {t("fees_in_netzoon")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            p={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "5px",
              justifyItems: "center",
            }}
          >
            <Typography variant="body1">{t("change_country")}</Typography>
            <CountryPicker />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
