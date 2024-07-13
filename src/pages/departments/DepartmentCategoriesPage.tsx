import { useParams } from "react-router-dom";
import { useGetAllCategoriesByDepartmentQuery } from "../../apis/departments/queries";
import { Params } from "./type";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Grid, Typography } from "@mui/material";
import DepartmentCategoryCard from "../../components/items/cards/department_category_card";

const DepartmentCategoriesPage = () => {
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
        {`Categories for (${categoriesInfo![0].department.name})`}
      </Typography>
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
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default DepartmentCategoriesPage;
