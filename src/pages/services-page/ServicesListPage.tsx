import { useNavigate, useParams } from "react-router-dom";
import { useGetServicesByCategoryQuery } from "../../apis/services/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid, Typography } from "@mui/material";
import ServiceCard from "../../components/items/cards/service_card";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useEffect } from "react";

const ServicesListPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useTranslation();
  const { country } = useCountry();

  const {
    data: servicesInfo,
    isError,
    isLoading,
    refetch,
  } = useGetServicesByCategoryQuery(categoryId ?? "", country);

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
        {servicesInfo?.title}
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
          {t("add_service_in")} {servicesInfo?.title}
        </Button>
      </Box>
      <Grid container gap={4} sx={{ marginTop: "30px" }}>
        {servicesInfo &&
        servicesInfo.services &&
        servicesInfo.services.length > 0 ? (
          servicesInfo.services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                {/* <ProductCard product={product} key={index} /> */}
                <ServiceCard service={service} key={index} />
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
            {`There is No Services in this category yet.`}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ServicesListPage;
