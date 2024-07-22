import { useGetAllDepartmentsQuery } from "../../apis/departments/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Grid, Typography } from "@mui/material";
import DepartmentCard from "../../components/items/cards/department_card";
import { useTranslation } from "react-i18next";

const DepartmentsPage = () => {
  const { t } = useTranslation();
  const {
    data: departmentsInfo,
    isError,
    isLoading,
  } = useGetAllDepartmentsQuery();

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
        {t("all_departments")}
      </Typography>
      <Grid
        container
        gap={4}
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {departmentsInfo &&
          departmentsInfo.map((department, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <DepartmentCard department={department} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default DepartmentsPage;
