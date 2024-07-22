import { useParams } from "react-router-dom";
import {
  useAddNewsMutation,
  useEditNewsMutation,
  useGetNewsByIdQuery,
} from "../../apis/news/queries";
import { NewsModel } from "../../apis/news/type";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please enter news Title"),
  description: Yup.string().required("Please enter news description"),
});

const AddEditNewsPage = () => {
  const { country } = useCountry();
  const { t } = useTranslation();
  const { id, ownerId } = useParams<{
    id: string;
    ownerId: string;
  }>();
  const { data: newsInfo } = useGetNewsByIdQuery(id!);
  const { mutate: addNews } = useAddNewsMutation();
  const { mutate: editNews } = useEditNewsMutation();
  const initialValues: NewsModel = {
    ...(id && { _id: id }),
    creator: ownerId,
    title: newsInfo?.title || "",
    description: newsInfo?.description || "",
    country: newsInfo?.country ?? country,
  };
  const handleSubmit = (
    values: NewsModel,
    { setSubmitting }: FormikHelpers<NewsModel>
  ) => {
    id
      ? editNews(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addNews(values, {
          onSettled() {
            setSubmitting(false);
          },
        });
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 3,
        }}
      >
        {id ? `${t("edit")} ${newsInfo?.title}` : t("add_news")}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label={t("title")}
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label={t("description")}
                  multiline
                  minRows={1}
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <ImageDragDropField
                  name="image"
                  label="Product Image"
                  oldImg={newsInfo?.imgUrl}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack justifyContent={"center"}>
                  <LoadingButton
                    isSubmitting={isSubmitting}
                    buttonText={t("save")}
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

export default AddEditNewsPage;
