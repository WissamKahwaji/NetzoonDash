import { useParams } from "react-router-dom";
import { Params } from "./type";
import {
  useEditDepartmentCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../apis/departments/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { EditDepartmentCategoryParams } from "../../apis/departments/type";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";

const DepartmentCategoryDetailsPage = () => {
  const { categoryId } = useParams<Params>();
  const {
    data: categoryInfo,
    isLoading,
    isError,
  } = useGetCategoryByIdQuery(categoryId ?? "");
  const { mutate: editDepartmentCategory } =
    useEditDepartmentCategoryMutation();
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  const initialValues: EditDepartmentCategoryParams = {
    _id: categoryId ?? "",
    name: categoryInfo?.name ?? "",
  };
  const handleSubmit = async (
    values: EditDepartmentCategoryParams,
    { setSubmitting }: FormikHelpers<EditDepartmentCategoryParams>
  ) => {
    editDepartmentCategory(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
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
          mb: 6,
        }}
      >
        {categoryInfo?.name}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <Grid container justifyContent={"center"} spacing={3}>
              <Grid item xs={12} md={10}>
                <ImageDragDropField
                  name="image"
                  label="Category Image"
                  oldImg={categoryInfo?.imageUrl as string}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  name="name"
                  fullWidth
                  label="Category Name"
                  error={touched.name && !!errors.name}
                  onChange={handleChange}
                  value={values.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack justifyContent={"center"}>
                  <LoadingButton
                    isSubmitting={isSubmitting}
                    buttonText={"submit"}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DepartmentCategoryDetailsPage;
