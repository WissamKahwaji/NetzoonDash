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
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const validationSchema = Yup.object().shape({
  advertisingTitle: Yup.string().required("Please enter advertising Title"),

  advertisingDescription: Yup.string().required(
    "Please enter advertising Description"
  ),
  advertisingYear: Yup.string().required("Please enter  advertising Year"),
  advertisingStartDate: Yup.string().required(
    "Please enter advertising Start Date"
  ),
  advertisingEndDate: Yup.string().required(
    "Please enter advertising End Date"
  ),
});

const AddEditAdsPage = () => {
  const { country } = useCountry();
  const { t } = useTranslation();
  const { id, ownerId } = useParams<{
    id: string;
    ownerId: string;
  }>();
  const { data: adsInfo } = useGetAdsByIdQuery(id!);
  const { mutate: addAds } = useAddAdsMutation();
  const { mutate: editAds } = useEditAdsMutation();

  const initialValues: AdsInputModel = {
    ...(id && { _id: id }),
    owner: adsInfo?.owner?._id || ownerId,
    advertisingDescription: adsInfo?.advertisingDescription || "",
    advertisingTitle: adsInfo?.advertisingTitle || "",
    purchasable: adsInfo?.purchasable || false,
    advertisingStartDate: adsInfo?.advertisingStartDate || "",
    advertisingEndDate: adsInfo?.advertisingEndDate || "",
    type: adsInfo?.type || "",
    category: adsInfo?.category || "",
    color: adsInfo?.color || "",
    guarantee: adsInfo?.guarantee || false,
    contactNumber: adsInfo?.contactNumber || "",
    advertisingLocation: adsInfo?.advertisingLocation || "",
    advertisingPrice: adsInfo?.advertisingPrice,
    advertisingType: adsInfo?.advertisingType || advertisingType.PRODUCT,
    forPurchase: adsInfo?.forPurchase || false,
    advertisingYear: adsInfo?.advertisingYear || "",
    country: adsInfo?.country || country,
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
        {id
          ? `${t("edit")} ${adsInfo?.advertisingTitle}`
          : `${t("add_new_ads")}`}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
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
                  <Typography>{t("select_ads_type")}</Typography>
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
                    <MenuItem value={""}>{t("all")}</MenuItem>
                    <MenuItem value={advertisingType.PRODUCT}>
                      {t("product")}
                    </MenuItem>
                    <MenuItem value={advertisingType.CAR}>{t("car")}</MenuItem>
                    <MenuItem value={advertisingType.PLANES}>
                      {t("planes")}
                    </MenuItem>
                    <MenuItem value={advertisingType.SEA_COMPANIES}>
                      {t("ships")}
                    </MenuItem>
                    <MenuItem value={advertisingType.REAL_ESTATE}>
                      {t("real_estate")}
                    </MenuItem>
                    <MenuItem value={advertisingType.SERVICE}>
                      {t("service")}
                    </MenuItem>
                    <MenuItem value={advertisingType.DELIVERY_SERVICE}>
                      {t("delivery_service")}
                    </MenuItem>
                    <MenuItem value={advertisingType.USER}>
                      {t("user")}
                    </MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="advertisingTitle"
                  name="advertisingTitle"
                  label={t("advertising_title")}
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
                  label={t("advertising_description")}
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
                  label={t("advertising_location")}
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
                  label={t("advertising_year")}
                  type="date"
                  value={values.advertisingYear}
                  onChange={handleChange}
                  error={
                    touched.advertisingYear && Boolean(errors.advertisingYear)
                  }
                  helperText={touched.advertisingYear && errors.advertisingYear}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="color"
                  name="color"
                  label={t("advertising_color")}
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
                      label={t("advertising_start_date")}
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
                      label={t("advertising_end_date")}
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
                  label={t("advertising_price")}
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
                  label={t("contact_number")}
                  type="tel"
                  value={values.contactNumber}
                  onChange={handleChange}
                  error={touched.contactNumber && Boolean(errors.contactNumber)}
                  helperText={touched.contactNumber && errors.contactNumber}
                  sx={{ mb: 2, direction: "ltr" }}
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
                  label={t("is_purchasable")}
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
                  label={t("is_there_guarantee")}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <ImageDragDropField
                  name="image"
                  label={t("ads_image")}
                  oldImg={adsInfo?.advertisingImage}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  {t("upload_images")}
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
                  {t("upload_video")}
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

export default AddEditAdsPage;
