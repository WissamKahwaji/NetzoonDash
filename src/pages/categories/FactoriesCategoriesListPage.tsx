import { useTranslation } from "react-i18next";
import { useGetFactoriesCategoriesQuery } from "../../apis/departments/queries";
import LoadingPage from "../loading-page/LoadingPage";
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
// import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const FactoriesCategoriesListPage = () => {
  const { t } = useTranslation();
  const {
    data: factoriesCategories,
    isError,
    isLoading,
  } = useGetFactoriesCategoriesQuery();
  const navigate = useNavigate();
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component="h1"
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
          color: "black",
        }}
      >
        {t("factories_categories")}
      </Typography>
      <Grid container spacing={4}>
        {factoriesCategories &&
          factoriesCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <Card>
                  <CardHeader
                    title={
                      <CardActionArea
                        onClick={() => {
                          navigate(
                            `/categories/facroties-categories/${category._id}`
                          );
                        }}
                      >
                        <Typography>{t(category.title)}</Typography>
                      </CardActionArea>
                    }
                    // action={
                    //   <Box
                    //     sx={{
                    //       display: "flex",
                    //       flexDirection: "row",
                    //       alignItems: "center",
                    //     }}
                    //   >
                    //     <IconButton color="primary">
                    //       <Edit />
                    //     </IconButton>
                    //     <IconButton color="error">
                    //       <Delete />
                    //     </IconButton>
                    //   </Box>
                    // }
                  />
                </Card>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default FactoriesCategoriesListPage;
