import { useGetProductsByCategoryQuery } from "../../apis/product/queries";
import { useNavigate, useParams } from "react-router-dom";
import { Params } from "./type";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid, Typography } from "@mui/material";

import { useGetCategoryByIdQuery } from "../../apis/departments/queries";

import ProductCard from "../../components/items/cards/product_card/ProductCard";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useEffect } from "react";

const ProductList = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const { categoryId } = useParams<Params>();
  const {
    data: productsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetProductsByCategoryQuery(categoryId ?? "", country);
  const {
    data: categoryInfo,
    isError: isErrorCategory,
    isLoading: isLoadingCategory,
  } = useGetCategoryByIdQuery(categoryId ?? "");
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, [country, refetch]);
  if (isError || isErrorCategory) return <div>Error !!!</div>;
  if (isLoading || isLoadingCategory) return <LoadingPage />;

  return (
    <Box sx={{ width: "100%" }}>
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
          {`${t("add_product_in")} ${categoryInfo?.name}`}
        </Button>
      </Box>
      <Grid container gap={4}>
        {productsInfo && productsInfo.length > 0 ? (
          productsInfo.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <ProductCard product={product} key={index} />
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
            {`There is No Product in this category yet.`}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
