import { Link } from "react-router-dom";

import LoadingPage from "../loading-page/LoadingPage";
import { useEffect, useState } from "react";
import { advertisingType } from "../../apis/ads/type";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetAdsListQuery } from "../../apis/ads/queries";
import AdsCard from "../../components/items/cards/ads_card";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const AdsListPage = () => {
  const { country } = useCountry();
  const { t } = useTranslation();
  const {
    data: adsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetAdsListQuery(country);
  const [filterType, setFilterType] = useState<advertisingType | "">("");

  const filteredAds =
    adsInfo?.results &&
    adsInfo?.results.filter(ads =>
      filterType ? ads.advertisingType === filterType : true
    );

  useEffect(() => {
    refetch();
  }, [country, refetch]);
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

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
        }}
      >
        {t("ads")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "40px",
          width: "100%",
        }}
      >
        <Link to={`owner`}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: "fit-content",
            }}
          >
            {t("add_ads")}
          </Button>
        </Link>

        <Box sx={{ marginRight: "8px", marginBottom: "10px" }}>
          <Select
            value={filterType}
            onChange={e => setFilterType(e.target.value as advertisingType)}
            displayEmpty
            inputProps={{ "aria-label": "Select ads type" }}
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value={""}>{t("all")}</MenuItem>
            <MenuItem value={advertisingType.PRODUCT}>{t("product")}</MenuItem>
            <MenuItem value={advertisingType.CAR}>{t("car")}</MenuItem>
            <MenuItem value={advertisingType.PLANES}>{t("planes")}</MenuItem>
            <MenuItem value={advertisingType.SEA_COMPANIES}>
              {t("ships")}
            </MenuItem>
            <MenuItem value={advertisingType.REAL_ESTATE}>
              {t("real_estate")}
            </MenuItem>
            <MenuItem value={advertisingType.SERVICE}>{t("service")}</MenuItem>
            <MenuItem value={advertisingType.DELIVERY_SERVICE}>
              {t("delivery_service")}
            </MenuItem>
            <MenuItem value={advertisingType.USER}>{t("user")}</MenuItem>
          </Select>
        </Box>
      </Box>
      <Grid container gap={4}>
        {filteredAds &&
          filteredAds.map((ads, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <AdsCard
                  adsId={ads._id ?? ""}
                  imageUrl={ads.advertisingImage ?? ""}
                  name={ads.advertisingTitle ?? ""}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default AdsListPage;
