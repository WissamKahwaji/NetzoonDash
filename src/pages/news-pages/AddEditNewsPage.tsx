import { useParams } from "react-router-dom";
import {
  useAddNewsMutation,
  useEditNewsMutation,
  useGetNewsByIdQuery,
} from "../../apis/news/queries";
import { NewsModel } from "../../apis/news/type";
import { Form, Formik, FormikHelpers } from "formik";
import {
  Box,
  Grid,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";

const AddEditNewsPage = () => {
  const { id, ownerId } = useParams<{
    id: string;
    ownerId: string;
  }>();
  const { data: newsInfo } = useGetNewsByIdQuery(id ?? "");
  const { mutate: addNews } = useAddNewsMutation();
  const { mutate: editNews } = useEditNewsMutation();
  const initialValues: NewsModel = {
    ...(id && { _id: id }),
    creator: ownerId,
    title: newsInfo?.title ?? "",
    description: newsInfo?.description ?? "",
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
        {id ? `Edit ${newsInfo?.title}` : `Add New Ads`}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
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
                  label="Title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextareaAutosize
                  id="description"
                  title="description"
                  name="description"
                  placeholder="description"
                  minRows={3}
                  //   type="text"
                  value={values.description}
                  onChange={handleChange}
                  style={{
                    marginBottom: 2,
                    padding: 7,
                    border: "1px solid gray",
                    borderRadius: 3,
                    width: "100%",
                  }}
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
                    buttonText={id ? "Edit News" : "Add News"}
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
