import { Link, useParams } from "react-router-dom";
import { useGetAllCategoriesByDepartmentQuery } from "../../apis/departments/queries";
import { Params } from "./type";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid, Typography } from "@mui/material";
import DepartmentCategoryCard from "../../components/items/cards/department_category_card";
import { useTranslation } from "react-i18next";

const DepartmentCategoriesPage = () => {
  const { t } = useTranslation();
  const { departmentId } = useParams<Params>();
  const {
    data: categoriesInfo,
    isError,
    isLoading,
  } = useGetAllCategoriesByDepartmentQuery(departmentId ?? "");

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
        {`${t("categories_for")} (${categoriesInfo![0].department.name})`}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Link to={`add`} reloadDocument>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: "fit-content",
            }}
          >
            {`${t("add_category_in")} ${categoriesInfo![0].department.name}`}
          </Button>
        </Link>
      </Box>
      <Grid container gap={4}>
        {categoriesInfo &&
          categoriesInfo.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <DepartmentCategoryCard
                  key={index}
                  categoryId={category._id}
                  name={category.name}
                  imageUrl={category.imageUrl}
                  nameAr={category.nameAr ?? category.name}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default DepartmentCategoriesPage;
