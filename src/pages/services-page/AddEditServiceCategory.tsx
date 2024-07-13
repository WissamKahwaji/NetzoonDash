import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { ServiceCategoryModel } from "../../apis/services/type";
import { useParams } from "react-router-dom";
import {
  useAddServiceCategoryMutation,
  useEditServiceCategoryMutation,
  useGetServiceCategoryByIdQuery,
} from "../../apis/services/queries";

import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";

const AddEditServiceCategory = () => {
  const { id } = useParams<{ id: string }>();

  const { data: categoryInfo } = useGetServiceCategoryByIdQuery(id ?? "");

  const { mutate: addServiceCategory } = useAddServiceCategoryMutation();
  const { mutate: editServiceCategory } = useEditServiceCategoryMutation();

  const initialValues: ServiceCategoryModel = {
    ...(id && { _id: id }),
    title: categoryInfo?.title ?? "",
  };
  const handleSubmit = async (
    values: ServiceCategoryModel,
    { setSubmitting }: FormikHelpers<ServiceCategoryModel>
  ) => {
    id
      ? editServiceCategory(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addServiceCategory(values, {
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
        {id ? `Edit ${categoryInfo?.title}` : `Add Category`}
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <Grid container justifyContent={"center"} spacing={3}>
              <Grid item xs={12} md={5}>
                <TextField
                  name="title"
                  fullWidth
                  label="Category title"
                  error={touched.title && !!errors.title}
                  onChange={handleChange}
                  value={values.title}
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

export default AddEditServiceCategory;
