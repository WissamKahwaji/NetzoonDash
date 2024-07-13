import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import freezoneImg from "../../assets/free_zones.png";
import factoriesImg from "../../assets/factories.png";
import localCompaniesImg from "../../assets/local_companies.png";
import seaCompaniesImg from "../../assets/ships.png";
import carsImg from "../../assets/cars_cat3.jpeg";
import civilaircraftImg from "../../assets/plan.jpg";
import usersImg from "../../assets/users_cat2.webp";
import realEstateImg from "../../assets/real_estate.jpg";
import tradersImg from "../../assets/seller.jpg";
import deliveryCompaniesImg from "../../assets/delivery.jpg";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const categories = [
    { url: freezoneImg, name: "free_zone_companies", type: "freezone" },
    { url: factoriesImg, name: "factories", type: "factory" },
    { url: localCompaniesImg, name: "local_companies", type: "local_company" },
    { url: seaCompaniesImg, name: "sea_companies", type: "sea_companies" },
    { url: carsImg, name: "cars", type: "car" },
    { url: civilaircraftImg, name: "civil_aircraft", type: "planes" },
    { url: usersImg, name: "users", type: "user" },
    { url: realEstateImg, name: "real_estate", type: "real_estate" },
    { url: tradersImg, name: "traders", type: "trader" },
    {
      url: deliveryCompaniesImg,
      name: "delivery_companies",
      type: "delivery_company",
    },
  ];
  const navigate = useNavigate();
  const handleClick = (type: string) => {
    if (type === "factory") {
      navigate(`/categories/facroties-categories`);
    } else {
      navigate(`/users/${type}`);
    }
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
        All Categories
      </Typography>
      <Grid
        container
        gap={4}
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {categories &&
          categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <Card>
                  <CardHeader
                    title={
                      <Typography>
                        {category.name.length > 20 ? (
                          <>
                            {category.name.slice(0, 20)}
                            <Box component={"span"}>...</Box>
                          </>
                        ) : (
                          category.name
                        )}
                      </Typography>
                    }
                  />
                  <CardActionArea
                    onClick={() => {
                      handleClick(category.type);
                    }}
                  >
                    <CardMedia
                      component={"img"}
                      sx={{ objectFit: "contain" }}
                      src={category.url}
                      height="240px"
                      crossOrigin="anonymous"
                    />
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
