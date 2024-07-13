import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddAdsMutation,
  useEditAdsMutation,
  useGetAdsByIdQuery,
} from "../../apis/ads/queries";
import { AdsInputModel, advertisingType } from "../../apis/ads/type";
import { Form, Formik, FormikHelpers } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import dayjs from "dayjs";

const AddEditAdsPage = () => {
  const { id, ownerId } = useParams<{
    id: string;
    ownerId: string;
  }>();
  const { data: adsInfo } = useGetAdsByIdQuery(id ?? "");
  const { mutate: addAds } = useAddAdsMutation();
  const { mutate: editAds } = useEditAdsMutation();

  const initialValues: AdsInputModel = {
    ...(id && { _id: id }),
    owner: adsInfo?.owner?._id ?? ownerId,
    advertisingDescription: adsInfo?.advertisingDescription ?? "",
    advertisingTitle: adsInfo?.advertisingTitle ?? "",
    purchasable: adsInfo?.purchasable ?? false,
    advertisingStartDate: adsInfo?.advertisingStartDate ?? "",
    advertisingEndDate: adsInfo?.advertisingEndDate ?? "",
    type: adsInfo?.type ?? "",
    category: adsInfo?.category ?? "",
    color: adsInfo?.color ?? "",
    guarantee: adsInfo?.guarantee ?? false,
    contactNumber: adsInfo?.contactNumber ?? "",
    advertisingLocation: adsInfo?.advertisingLocation ?? "",
    advertisingPrice: adsInfo?.advertisingPrice,
    advertisingType: adsInfo?.advertisingType ?? advertisingType.PRODUCT,
    forPurchase: adsInfo?.forPurchase ?? false,
    advertisingYear: adsInfo?.advertisingYear,
  };
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const handleSubmit = (
    values: AdsInputModel,
    { setSubmitting }: FormikHelpers<AdsInputModel>
  ) => {
    id
      ? editAds(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addAds(values, {
          onSettled() {
            setSubmitting(false);
          },
        });
  };
  return (
    <Box>
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
        {id ? `Edit ${adsInfo?.advertisingTitle}` : `Add New Ads`}
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "14px",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <Typography>Select Ads Type</Typography>
                  <Select
                    value={values.advertisingType}
                    onChange={e =>
                      setFieldValue(
                        "advertisingType",
                        e.target.value as advertisingType
                      )
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Select ads type" }}
                    IconComponent={ExpandMoreIcon}
                  >
                    <MenuItem value={advertisingType.PRODUCT}>PRODUCT</MenuItem>
                    <MenuItem value={advertisingType.CAR}>CAR</MenuItem>
                    <MenuItem value={advertisingType.PLANES}>PLANES</MenuItem>
                    <MenuItem value={advertisingType.SEA_COMPANIES}>
                      SEA_COMPANIES
                    </MenuItem>
                    <MenuItem value={advertisingType.REAL_ESTATE}>
                      REAL_ESTATE
                    </MenuItem>
                    <MenuItem value={advertisingType.SERVICE}>SERVICE</MenuItem>
                    <MenuItem value={advertisingType.DELIVERY_SERVICE}>
                      DELIVERY_SERVICE
                    </MenuItem>
                    <MenuItem value={advertisingType.USER}>USER</MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="advertisingTitle"
                  name="advertisingTitle"
                  label="advertising Title"
                  type="text"
                  value={values.advertisingTitle}
                  onChange={handleChange}
                  error={
                    touched.advertisingTitle && Boolean(errors.advertisingTitle)
                  }
                  helperText={
                    touched.advertisingTitle && errors.advertisingTitle
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="advertisingDescription"
                  name="advertisingDescription"
                  label="advertising Description"
                  type="text"
                  value={values.advertisingDescription}
                  onChange={handleChange}
                  error={
                    touched.advertisingDescription &&
                    Boolean(errors.advertisingDescription)
                  }
                  helperText={
                    touched.advertisingDescription &&
                    errors.advertisingDescription
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="advertisingLocation"
                  name="advertisingLocation"
                  label="advertising Location"
                  type="text"
                  value={values.advertisingLocation}
                  onChange={handleChange}
                  error={
                    touched.advertisingLocation &&
                    Boolean(errors.advertisingLocation)
                  }
                  helperText={
                    touched.advertisingLocation && errors.advertisingLocation
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="advertisingYear"
                  name="advertisingYear"
                  label="advertising Year"
                  type="date"
                  value={values.advertisingYear}
                  onChange={handleChange}
                  error={
                    touched.advertisingYear && Boolean(errors.advertisingYear)
                  }
                  helperText={touched.advertisingYear && errors.advertisingYear}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="color"
                  name="color"
                  label="advertising color"
                  type="text"
                  value={values.color}
                  onChange={handleChange}
                  error={touched.color && Boolean(errors.color)}
                  helperText={touched.color && errors.color}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="advertising Start Date"
                      value={
                        values.advertisingStartDate
                          ? dayjs(values.advertisingStartDate)
                          : null
                      }
                      onChange={value =>
                        setFieldValue(
                          "advertisingStartDate",
                          value ? value.format("YYYY-MM-DD") : ""
                        )
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="advertising End Date"
                      value={
                        values.advertisingEndDate
                          ? dayjs(values.advertisingEndDate)
                          : null
                      }
                      onChange={value =>
                        setFieldValue(
                          "advertisingEndDate",
                          value ? value.format("YYYY-MM-DD") : ""
                        )
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="advertisingPrice"
                  name="advertisingPrice"
                  label="advertising Price"
                  type="number"
                  value={values.advertisingPrice}
                  onChange={handleChange}
                  error={
                    touched.advertisingPrice && Boolean(errors.advertisingPrice)
                  }
                  helperText={
                    touched.advertisingPrice && errors.advertisingPrice
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="contactNumber"
                  name="contactNumber"
                  label="contact Number"
                  type="tel"
                  value={values.contactNumber}
                  onChange={handleChange}
                  error={touched.contactNumber && Boolean(errors.contactNumber)}
                  helperText={touched.contactNumber && errors.contactNumber}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.purchasable}
                      onChange={e =>
                        setFieldValue("purchasable", e.target.checked)
                      }
                      name="purchasable"
                      color="primary"
                    />
                  }
                  label="Is Purchasable?"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.guarantee}
                      onChange={e =>
                        setFieldValue("guarantee", e.target.checked)
                      }
                      name="guarantee"
                      color="primary"
                    />
                  }
                  label="Is there guarantee?"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <ImageDragDropField
                  name="image"
                  label="Ads Image"
                  oldImg={adsInfo?.advertisingImage}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Product Images
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={event => {
                      if (event.currentTarget.files) {
                        setFieldValue(
                          "advertisingImageList",
                          Array.from(event.currentTarget.files)
                        );
                      }
                    }}
                  />
                </Button>
                {values.advertisingImageList &&
                  values.advertisingImageList.length > 0 && (
                    <Typography>
                      {values.advertisingImageList.length} images selected
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
                    buttonText={id ? "Edit Ads" : "Add Ads"}
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

export default AddEditAdsPage;
