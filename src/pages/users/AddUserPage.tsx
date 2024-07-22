import React, { useEffect, useState } from "react";
import { useAddUserMutation } from "../../apis/users/queries";
import { UserModel } from "../../apis/users/type";
import { useParams } from "react-router-dom";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import { USER_TYPE } from "../../constants";
import { useGetAramexCitiesQuery } from "../../apis/aramex/queries";
import LoadingPage from "../loading-page/LoadingPage";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  email: Yup.string().required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),

  firstMobile: Yup.string()
    .matches(/^\+?\d+$/, "Invalid mobile number")
    .min(9, "Mobile number must be at least 9 characters long"),
  locationType: Yup.string().required("Please choose location Type"),
  city: Yup.string().required("Please choose city"),
  addressDetails: Yup.string().required("Please enter address Details"),
});

const AddUserPage = () => {
  const { t } = useTranslation();
  const { country } = useCountry();
  const { userType, title } = useParams<{
    userType: string;
    title: string | undefined;
  }>();
  const {
    data: citiesInfo,
    isError,
    isLoading,
    refetch,
  } = useGetAramexCitiesQuery(country);
  const [selectedCity, setSelectedCity] = useState(citiesInfo?.Cities[0] || "");
  const { mutate: addUser } = useAddUserMutation();

  useEffect(() => {
    refetch();
    if (citiesInfo) {
      setSelectedCity(citiesInfo?.Cities[0]);
    }
  }, [citiesInfo, refetch, country]);

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;
  const initialValues: UserModel = {
    username: "",
    email: "",
    userType: userType,
    password: "",
    firstMobile: "",
    isFreeZoon: false,
    isService: false,
    isSelectable: false,
    freezoneCity: "",
    deliverable: false,
    subcategory: "",
    country: country ?? "AE",
    address: "",
    netzoonBalance: 0,
    businessLicense: "",
    companyProductsNumber: 0,
    sellType: "",
    toCountry: "",
    profilePhoto: "",
    coverPhoto: "",
    banerPhoto: "",
    frontIdPhoto: "",
    backIdPhoto: "",
    bio: "",
    description: "",
    website: "",
    slogn: "",
    link: "",
    deliveryPermitPhoto: "",
    tradeLicensePhoto: "",
    isThereWarehouse: false,
    isThereFoodsDelivery: false,
    deliveryType: "",
    deliveryCarsNum: 0,
    deliveryMotorsNum: 0,
    vehicles: [],
    products: [],
    city: "",
    addressDetails: "",
    contactName: "",
    floorNum: 0,
    locationType: "home",
    ...(title && {
      title: title,
    }),
  };
  const handleSubmit = (
    values: UserModel,
    { setSubmitting }: FormikHelpers<UserModel>
  ) => {
    addUser(values, {
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
        {`${t("add_user_in")} ${t(userType!)}`}
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
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label={t("user_name")}
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ mb: 2, direction: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={t("email")}
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ mb: 2, direction: "ltr" }}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="contactName"
                  name="contactName"
                  label={t("contact_name")}
                  type="text"
                  value={values.contactName}
                  onChange={handleChange}
                  error={touched.contactName && Boolean(errors.contactName)}
                  helperText={touched.contactName && errors.contactName}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="firstMobile"
                  name="firstMobile"
                  label={t("first_mobile")}
                  type="tel"
                  value={values.firstMobile}
                  onChange={handleChange}
                  error={touched.firstMobile && Boolean(errors.contactName)}
                  helperText={touched.firstMobile && errors.firstMobile}
                  sx={{ mb: 2, direction: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label={t("password")}
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ mb: 2, direction: "ltr" }}
                />
              </Grid>
              {(userType === USER_TYPE.LOCAL_COMPANY ||
                userType === USER_TYPE.TRADER ||
                userType === USER_TYPE.FREEZONE) && (
                <Grid item xs={12} lg={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.isSelectable}
                        onChange={e =>
                          setFieldValue("isSelectable", e.target.checked)
                        }
                        name="isSelectable"
                        color="primary"
                      />
                    }
                    label={t("are_your_products_shareable_by_the_customer")}
                    sx={{ direction: "ltr" }}
                  />
                </Grid>
              )}
              {(userType === USER_TYPE.LOCAL_COMPANY ||
                userType === USER_TYPE.FACTORY ||
                userType === USER_TYPE.TRADER ||
                userType === USER_TYPE.FREEZONE) && (
                <Grid item xs={12} lg={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.isService}
                        onChange={e =>
                          setFieldValue("isService", e.target.checked)
                        }
                        name="isService"
                        color="primary"
                      />
                    }
                    label={t("do_you_offer_services_rather_than_products")}
                    sx={{ direction: "ltr" }}
                  />
                </Grid>
              )}
              {userType === USER_TYPE.DELIVERY_COMPANY && (
                <Grid item xs={12} lg={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.isThereWarehouse}
                        onChange={e =>
                          setFieldValue("isThereWarehouse", e.target.checked)
                        }
                        name="isThereWarehouse"
                        color="primary"
                      />
                    }
                    label={t("is_there_a_warehouse")}
                    sx={{ direction: "ltr" }}
                  />
                </Grid>
              )}

              {userType === USER_TYPE.DELIVERY_COMPANY && (
                <Grid item xs={12} lg={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.isThereFoodsDelivery}
                        onChange={e =>
                          setFieldValue(
                            "isThereFoodsDelivery",
                            e.target.checked
                          )
                        }
                        name="isThereFoodsDelivery"
                        color="primary"
                      />
                    }
                    label={t("is_there_food_delivery")}
                    sx={{ direction: "ltr" }}
                  />
                </Grid>
              )}
              {userType === USER_TYPE.DELIVERY_COMPANY && (
                <Grid item xs={12} lg={6}>
                  <FormControl>
                    <FormLabel id="delivery-type-label">
                      {t("delivery_type")}
                    </FormLabel>
                    <RadioGroup
                      id="delivery-type"
                      aria-labelledby="delivery-type-label"
                      value={values.deliveryType}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setFieldValue("deliveryType", event.target.value);
                      }}
                      row
                    >
                      {[
                        "Inside country",
                        "Outside country",
                        "Inside and outside country",
                      ].map(option => (
                        <FormControlLabel
                          key={option}
                          control={<Radio />}
                          label={t(option)}
                          value={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              )}
              {userType === USER_TYPE.DELIVERY_COMPANY && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="deliveryCarsNum"
                    name="deliveryCarsNum"
                    label={t("deliveryCarsNum")}
                    type="number"
                    value={values.deliveryCarsNum}
                    onChange={handleChange}
                    error={
                      touched.deliveryCarsNum && Boolean(errors.deliveryCarsNum)
                    }
                    helperText={
                      touched.deliveryCarsNum && errors.deliveryCarsNum
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              {userType === USER_TYPE.DELIVERY_COMPANY && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="deliveryMotorsNum"
                    name="deliveryMotorsNum"
                    label={t("deliveryMotorsNum")}
                    type="number"
                    value={values.deliveryMotorsNum}
                    onChange={handleChange}
                    error={
                      touched.deliveryMotorsNum &&
                      Boolean(errors.deliveryMotorsNum)
                    }
                    helperText={
                      touched.deliveryMotorsNum && errors.deliveryMotorsNum
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography>{t("location_info")} :</Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyItems="center"
                  alignItems="center"
                >
                  <FormLabel>{t("city")} :</FormLabel>
                  <Select
                    value={selectedCity}
                    displayEmpty
                    inputProps={{ "aria-label": "Select city" }}
                    onChange={e => {
                      setSelectedCity(e.target.value);
                      setFieldValue("city", e.target.value);
                    }}
                    sx={{ width: "85%", direction: "ltr" }}
                  >
                    {citiesInfo?.Cities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>

                {/* <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="city"
                  type="text"
                  value={values.city}
                  onChange={handleChange}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  sx={{ mb: 2 }}
                /> */}
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="addressDetails"
                  name="addressDetails"
                  label={t("address_details")}
                  type="text"
                  value={values.addressDetails}
                  onChange={handleChange}
                  error={
                    touched.addressDetails && Boolean(errors.addressDetails)
                  }
                  helperText={touched.addressDetails && errors.addressDetails}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="floorNum"
                  name="floorNum"
                  label={t("floor_number")}
                  type="text"
                  value={values.floorNum}
                  onChange={handleChange}
                  error={touched.floorNum && Boolean(errors.floorNum)}
                  helperText={touched.floorNum && errors.floorNum}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl>
                  <FormLabel id="location-type-label">
                    {t("location_type")}
                  </FormLabel>
                  <RadioGroup
                    id="location-type"
                    aria-labelledby="location-type-label"
                    value={values.locationType}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("locationType", event.target.value);
                    }}
                    row
                  >
                    {["home", "work"].map(option => (
                      <FormControlLabel
                        key={option}
                        control={<Radio />}
                        label={t(option)}
                        value={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <ImageDragDropField name="profilePhoto" label="profile Photo" />
              </Grid>
              {userType !== USER_TYPE.USER && (
                <Grid item xs={12} lg={6}>
                  <ImageDragDropField name="coverPhoto" label="cover Photo" />
                </Grid>
              )}
              {userType !== USER_TYPE.USER && (
                <Grid item xs={12} lg={6}>
                  <ImageDragDropField
                    name="frontIdPhoto"
                    label="frontId Photo"
                  />
                </Grid>
              )}
              {userType !== USER_TYPE.USER && (
                <Grid item xs={12} lg={6}>
                  <ImageDragDropField name="backIdPhoto" label="backId Photo" />
                </Grid>
              )}
              {userType !== USER_TYPE.USER && (
                <Grid item xs={12} lg={6}>
                  <ImageDragDropField
                    name="tradeLicensePhoto"
                    label="tradeLicense Photo"
                  />
                </Grid>
              )}
              {userType === USER_TYPE.DELIVERY_COMPANY && (
                <Grid item xs={12} lg={6}>
                  <ImageDragDropField
                    name="deliveryPermitPhoto"
                    label="delivery Permit Photo"
                  />
                </Grid>
              )}
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

export default AddUserPage;
