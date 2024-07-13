import { useNavigate } from "react-router-dom";

import LoadingPage from "../loading-page/LoadingPage";
import { useState } from "react";
import { advertisingType } from "../../apis/ads/type";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetAdsListQuery } from "../../apis/ads/queries";
import AdsCard from "../../components/items/cards/ads_card";

const AdsListPage = () => {
  const { data: adsInfo, isError, isLoading } = useGetAdsListQuery();
  const [filterType, setFilterType] = useState<advertisingType | "">("");
  const navigate = useNavigate();
  const filteredAds =
    adsInfo?.results &&
    adsInfo?.results.filter(ads =>
      filterType ? ads.advertisingType === filterType : true
    );
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
        Ads
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
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "fit-content",
          }}
          onClick={() => {
            navigate(`owner`);
          }}
        >
          Add ads
        </Button>

        <Box sx={{ marginRight: "8px", marginBottom: "10px" }}>
          <Select
            value={filterType}
            onChange={e => setFilterType(e.target.value as advertisingType)}
            displayEmpty
            inputProps={{ "aria-label": "Select ads type" }}
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value={""}>ALL</MenuItem>
            <MenuItem value={advertisingType.PRODUCT}>PRODUCT</MenuItem>
            <MenuItem value={advertisingType.CAR}>CAR</MenuItem>
            <MenuItem value={advertisingType.PLANES}>PLANES</MenuItem>
            <MenuItem value={advertisingType.SEA_COMPANIES}>
              SEA_COMPANIES
            </MenuItem>
            <MenuItem value={advertisingType.REAL_ESTATE}>REAL_ESTATE</MenuItem>
            <MenuItem value={advertisingType.SERVICE}>SERVICE</MenuItem>
            <MenuItem value={advertisingType.DELIVERY_SERVICE}>
              DELIVERY_SERVICE
            </MenuItem>
            <MenuItem value={advertisingType.USER}>USER</MenuItem>
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
