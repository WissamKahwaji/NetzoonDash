import { Box, Button, Grid, Typography } from "@mui/material";
import { useGetServicesCategoriesQuery } from "../../apis/services/queries";
import LoadingPage from "../loading-page/LoadingPage";
import ServicesCategoriesCard from "../../components/items/cards/services_categories_card";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const navigate = useNavigate();
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
        Services Categories
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "fit-content",
          }}
          onClick={() => {
            navigate(`add`);
          }}
        >
          Add service category
        </Button>
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
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ServicesPage;
