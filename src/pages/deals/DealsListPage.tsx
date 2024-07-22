import { useNavigate, useParams } from "react-router-dom";
import {
  useGetDealCategoryByIdQuery,
  useGetDealsByCategoryQuery,
} from "../../apis/deals/queiries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid, Typography } from "@mui/material";
import DealCard from "../../components/items/cards/deal_card";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useEffect } from "react";

const DealsListPage = () => {
  const { country } = useCountry();
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const { categoryId } = useParams<{ categoryId: string }>();
  // const { data: categoryInfo } = useGetCategoryByIdQuery(categoryId ?? "");
  const {
    data: dealsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetDealsByCategoryQuery(categoryId ?? "", country);
  const { data: categoryInfo } = useGetDealCategoryByIdQuery(categoryId!);
  const navigate = useNavigate();
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
          color: "black",
        }}
      >
        {selectedLanguage === "en"
          ? categoryInfo?.name
          : categoryInfo?.nameAr ?? categoryInfo?.name}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
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
          {t("add_deal_in_this_category")}
        </Button>
      </Box>
      <Grid container gap={4} sx={{ marginTop: "30px" }}>
        {dealsInfo && dealsInfo.results.length > 0 ? (
          dealsInfo.results.map((deal, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <DealCard deal={deal} />
              </Box>
            </Grid>
          ))
        ) : (
          <Typography
            component={"h5"}
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "capitalize",
              mb: 3,
              color: "black",
            }}
          >
            {`There is No Deals in this category yet.`}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default DealsListPage;
