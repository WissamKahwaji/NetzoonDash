import { useParams } from "react-router-dom";
import {
  useAddServiceMutation,
  useEditServiceMutation,
  useGetServiceByIdQuery,
} from "../../apis/services/queries";
import { ServiceInputModel } from "../../apis/services/type";
import { Form, Formik, FormikHelpers } from "formik";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import { useState } from "react";

const AddEditServicePage = () => {
  const { id, ownerId, categoryId } = useParams<{
    id: string;
    ownerId: string;
    categoryId: string;
  }>();
  const { data: serviceInfo } = useGetServiceByIdQuery(id ?? "");
  const { mutate: addService } = useAddServiceMutation();
  const { mutate: editService } = useEditServiceMutation();
  const initialValues: ServiceInputModel = {
    ...(id && { _id: id }),
    title: serviceInfo?.title ?? "",
    description: serviceInfo?.description ?? "",
    owner: ownerId ?? "",
    whatsAppNumber: serviceInfo?.whatsAppNumber ?? "",
    country: serviceInfo?.country ?? "AE",
    bio: serviceInfo?.bio,
    price: serviceInfo?.price,
    category: categoryId,
  };
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const handleSubmit = (
    values: ServiceInputModel,
    { setSubmitting }: FormikHelpers<ServiceInputModel>
  ) => {
    id
      ? editService(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addService(values, {
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
        {id ? `Edit ${serviceInfo?.title}` : `Add New Service`}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          setFieldValue,
        }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="service title"
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
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="whatsAppNumber"
                  name="whatsAppNumber"
                  label="whatsApp Number"
                  type="tel"
                  value={values.whatsAppNumber}
                  onChange={handleChange}
                  error={
                    touched.whatsAppNumber && Boolean(errors.whatsAppNumber)
                  }
                  helperText={touched.whatsAppNumber && errors.whatsAppNumber}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextareaAutosize
                  id="bio"
                  title="bio"
                  name="bio"
                  placeholder="bio"
                  minRows={3}
                  //   type="text"
                  value={values.bio}
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
                  label="Service Image"
                  oldImg={serviceInfo?.imageUrl}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Service Images
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={event => {
                      if (event.currentTarget.files) {
                        setFieldValue(
                          "serviceImageList",
                          Array.from(event.currentTarget.files)
                        );
                      }
                    }}
                  />
                </Button>
                {values.serviceImageList &&
                  values.serviceImageList.length > 0 && (
                    <Typography>
                      {values.serviceImageList.length} images selected
                    </Typography>
                  )}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Product Video
                  <input
                    type="file"
                    accept="video/*"
                    hidden
                    multiple
                    onChange={event => {
                      if (event.currentTarget.files) {
                        setFieldValue(
                          "video",
                          Array.from(event.currentTarget.files)
                        );
                        setSelectedVideo(event.currentTarget.files[0]);
                      }
                    }}
                  />
                </Button>
                {selectedVideo && (
                  <Typography>Selected video: {selectedVideo.name}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack justifyContent={"center"}>
                  <LoadingButton
                    isSubmitting={isSubmitting}
                    buttonText={id ? "Edit Service" : "Add Service"}
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

export default AddEditServicePage;
