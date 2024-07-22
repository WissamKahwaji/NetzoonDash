import { useParams } from "react-router-dom";
import {
  useAddDealCategoryMutation,
  useEditDealCategoryMutation,
  useGetDealCategoryByIdQuery,
} from "../../apis/deals/queiries";
import { DealsCategoryModel } from "../../apis/deals/type";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import { useTranslation } from "react-i18next";

const AddEditDealCategoryPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: categoryInfo } = useGetDealCategoryByIdQuery(id ?? "");

  const { mutate: addDealCategory } = useAddDealCategoryMutation();
  const { mutate: editDealCategory } = useEditDealCategoryMutation();

  const initialValues: DealsCategoryModel = {
    ...(id && { _id: id }),
    name: categoryInfo?.name || "",
    nameAr: categoryInfo?.nameAr || "",
  };
  const handleSubmit = async (
    values: DealsCategoryModel,
    { setSubmitting }: FormikHelpers<DealsCategoryModel>
  ) => {
    id
      ? editDealCategory(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addDealCategory(values, {
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
        {id ? `${t("edit")} ${categoryInfo?.name}` : `${t("add_category")}`}
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
                  name="name"
                  fullWidth
                  label={t("category_name")}
                  error={touched.name && !!errors.name}
                  onChange={handleChange}
                  value={values.name}
                  sx={{ direction: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  name="nameAr"
                  fullWidth
                  label={t("category_name_ar")}
                  error={touched.nameAr && !!errors.nameAr}
                  onChange={handleChange}
                  value={values.nameAr}
                  sx={{ direction: "rtl" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack justifyContent={"center"}>
                  <LoadingButton
                    isSubmitting={isSubmitting}
                    buttonText={t("submit")}
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

export default AddEditDealCategoryPage;
