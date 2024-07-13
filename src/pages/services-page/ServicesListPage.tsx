import { useNavigate, useParams } from "react-router-dom";
import { useGetServicesByCategoryQuery } from "../../apis/services/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid, Typography } from "@mui/material";
import ServiceCard from "../../components/items/cards/service_card";

const ServicesListPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const {
    data: servicesInfo,
    isError,
    isLoading,
  } = useGetServicesByCategoryQuery(categoryId ?? "", "AE");

  const navigate = useNavigate();

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
          Add service in {servicesInfo?.title}
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
