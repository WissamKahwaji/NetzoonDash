import { useNavigate, useParams } from "react-router-dom";
import { useGetDealsByCategoryQuery } from "../../apis/deals/queiries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useGetCategoryByIdQuery } from "../../apis/departments/queries";

const DealsListPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data: categoryInfo } = useGetCategoryByIdQuery(categoryId ?? "");
  const {
    data: dealsInfo,
    isError,
    isLoading,
  } = useGetDealsByCategoryQuery(categoryInfo?.name ?? "", "AE");

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
        {categoryInfo?.name}
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
          Add Deal In This Category
        </Button>
      </Box>
      <Grid container gap={4} sx={{ marginTop: "30px" }}>
        {dealsInfo && dealsInfo.results.length > 0 ? (
          dealsInfo.results.map((deal, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <Typography>{deal.name}</Typography>
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

export default DealsListPage;
