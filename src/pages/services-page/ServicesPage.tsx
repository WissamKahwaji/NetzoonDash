import { Box, Button, Grid, Typography } from "@mui/material";
import { useGetServicesCategoriesQuery } from "../../apis/services/queries";
import LoadingPage from "../loading-page/LoadingPage";
import ServicesCategoriesCard from "../../components/items/cards/services_categories_card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServicesPage = () => {
  const { t } = useTranslation();
  const {
    data: servicesCategories,
    isError,
    isLoading,
  } = useGetServicesCategoriesQuery();

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
        {t("services_categories")}
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
            {t("add_service_category")}
          </Button>
        </Link>
      </Box>
      <Grid container gap={4}>
        {servicesCategories &&
          servicesCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <ServicesCategoriesCard
                  key={index}
                  categoryId={category._id ?? ""}
                  name={category.title}
                  nameAr={category.titleAr ?? category.title}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ServicesPage;
