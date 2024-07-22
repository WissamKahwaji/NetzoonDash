import { useParams } from "react-router-dom";
import {
  useEditUserMutation,
  useGetUserByIdQuery,
} from "../../apis/users/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { UserModel } from "../../apis/users/type";
import { Form, Formik, FormikHelpers } from "formik";
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
import { USER_TYPE } from "../../constants";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import { useEffect, useState } from "react";
import { useGetAramexCitiesQuery } from "../../apis/aramex/queries";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  email: Yup.string().required("Please enter your email"),

  firstMobile: Yup.string().min(
    9,
    "Mobile number must be at least 9 characters long"
  ),
  locationType: Yup.string().required("Please choose location Type"),
  city: Yup.string().required("Please choose city"),
  addressDetails: Yup.string().required("Please enter address Details"),
});

const EditUserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { country } = useCountry();
  const { t } = useTranslation();
  const {
    data: userInfo,
    isError,
    isLoading,
  } = useGetUserByIdQuery(userId ?? "");
  const {
    data: citiesInfo,
    isError: isErrorCities,
    isLoading: isLoadingCities,
    refetch,
  } = useGetAramexCitiesQuery(country);
  const [selectedCity, setSelectedCity] = useState(userInfo?.city || "");
  const { mutate: editUser } = useEditUserMutation();
  const initialValues: UserModel = {
    _id: userId,
    username: userInfo?.username ?? "",
    email: userInfo?.email ?? "",
    userType: userInfo?.userType ?? "",

    firstMobile: userInfo?.firstMobile ?? "",
    isFreeZoon: userInfo?.isFreeZoon,
    isService: userInfo?.isService,
    isSelectable: userInfo?.isSelectable,
    freezoneCity: userInfo?.freezoneCity,
    deliverable: userInfo?.deliverable,
    subcategory: userInfo?.subcategory,
    country: userInfo?.country ?? "AE",
    address: userInfo?.address,

    sellType: userInfo?.sellType,

    bio: userInfo?.bio,
    description: userInfo?.description,
    website: userInfo?.website,
    slogn: userInfo?.slogn,
    link: userInfo?.link,

    isThereWarehouse: userInfo?.isThereWarehouse,
    isThereFoodsDelivery: userInfo?.isThereFoodsDelivery,
    deliveryType: userInfo?.deliveryType,
    deliveryCarsNum: userInfo?.deliveryCarsNum,
    deliveryMotorsNum: userInfo?.deliveryMotorsNum,
    netzoonBalance: userInfo?.netzoonBalance,
    city: userInfo?.city,
    addressDetails: userInfo?.addressDetails,
    contactName: userInfo?.contactName,
    floorNum: userInfo?.floorNum,
    locationType: userInfo?.locationType,
  };

  const handleSubmit = (
    values: UserModel,
    { setSubmitting }: FormikHelpers<UserModel>
  ) => {
    editUser(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  useEffect(() => {
    refetch();
    if (citiesInfo && userInfo) {
      setSelectedCity(userInfo?.city ?? "");
    }
  }, [citiesInfo, userInfo, userInfo?.city, country, refetch]);

  if (isError || isErrorCities) return <div>Error !!!</div>;
  if (isLoading || isLoadingCities) return <LoadingPage />;
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
        {userInfo?.username}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {t("user_type")} : {t(userInfo?.userType ?? "")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          mt: 1,
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {t("netzoon_balance")} : {userInfo?.netzoonBalance}
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="bio"
                  name="bio"
                  label={t("bio")}
                  multiline
                  minRows={1}
                  value={values.bio}
                  onChange={handleChange}
                  error={touched.bio && Boolean(errors.bio)}
                  helperText={touched.bio && errors.bio}
                  sx={{ mb: 2 }}
                />
                {/* <TextareaAutosize
                  id="bio"
                  title="bio"
                  name="bio"
                  placeholder="Bio"
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
                /> */}
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
                {/* <TextareaAutosize
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
                /> */}
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="website"
                  type="text"
                  value={values.website}
                  onChange={handleChange}
                  error={touched.website && Boolean(errors.website)}
                  helperText={touched.website && errors.website}
                  sx={{ mb: 2, direction: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="link"
                  name="link"
                  label="link"
                  type="text"
                  value={values.link}
                  onChange={handleChange}
                  error={touched.link && Boolean(errors.link)}
                  helperText={touched.link && errors.link}
                  sx={{ mb: 2, direction: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="slogn"
                  name="slogn"
                  label="slogn"
                  type="text"
                  value={values.slogn}
                  onChange={handleChange}
                  error={touched.slogn && Boolean(errors.slogn)}
                  helperText={touched.slogn && errors.slogn}
                  sx={{ mb: 2 }}
                />
              </Grid>

              {(userInfo?.userType === USER_TYPE.LOCAL_COMPANY ||
                userInfo?.userType === USER_TYPE.TRADER ||
                userInfo?.userType === USER_TYPE.FREEZONE) && (
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
              {(userInfo?.userType === USER_TYPE.LOCAL_COMPANY ||
                userInfo?.userType === USER_TYPE.FACTORY ||
                userInfo?.userType === USER_TYPE.TRADER ||
                userInfo?.userType === USER_TYPE.FREEZONE) && (
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
              {userInfo?.userType === USER_TYPE.DELIVERY_COMPANY && (
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

              {userInfo?.userType === USER_TYPE.DELIVERY_COMPANY && (
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
              {userInfo?.userType === USER_TYPE.DELIVERY_COMPANY && (
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
              {userInfo?.userType === USER_TYPE.DELIVERY_COMPANY && (
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
              {userInfo?.userType === USER_TYPE.DELIVERY_COMPANY && (
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
                <ImageDragDropField
                  name="profilePhoto"
                  label="profile Photo"
                  oldImg={userInfo?.profilePhoto}
                />
              </Grid>
              {userInfo?.userType !== USER_TYPE.USER && (
                <Grid item xs={12} lg={6}>
                  <ImageDragDropField
                    name="coverPhoto"
                    label="cover Photo"
                    oldImg={userInfo?.coverPhoto}
                  />
                </Grid>
              )}
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

export default EditUserPage;
