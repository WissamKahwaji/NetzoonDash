import { Link } from "react-router-dom";
import { useGetDealsCategoriesQuery } from "../../apis/deals/queiries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid, Typography } from "@mui/material";
import DealsCategoriesCard from "../../components/items/cards/deal_category_card";
import { useTranslation } from "react-i18next";

const DealsPage = () => {
  const { t } = useTranslation();
  const {
    data: dealsCategories,
    isError,
    isLoading,
  } = useGetDealsCategoriesQuery();

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
        {t("deals_categories")}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Link to={`add`} reloadDocument>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: "fit-content",
            }}
            // onClick={() => {
            //   navigate(`add`);
            // }}
          >
            {t("add_deal_category")}
          </Button>
        </Link>
      </Box>
      <Grid container gap={4}>
        {dealsCategories &&
          dealsCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <DealsCategoriesCard
                  key={index}
                  categoryId={category._id ?? ""}
                  name={category.name}
                  nameAr={category.nameAr ?? category.name}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default DealsPage;
