import React from "react";
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
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import { USER_TYPE } from "../../constants";

const AddUserPage = () => {
  const { userType } = useParams<{ userType: string }>();
  const { mutate: addUser } = useAddUserMutation();

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
    country: "AE",
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
        Add User in {userType} category
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
                  id="username"
                  name="username"
                  label="user name"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="contactName"
                  name="contactName"
                  label="contact Name"
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
                  label="Phone Number"
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
                  id="password"
                  name="password"
                  label="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ mb: 2 }}
                />
              </Grid>
              {userType === USER_TYPE.LOCAL_COMPANY && (
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
                    label="Are your products shareable by the customer?"
                  />
                </Grid>
              )}
              {userType === USER_TYPE.LOCAL_COMPANY && (
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
                    label="Do You Offer Services rather than products?"
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
                    label="Is there a warehouse?"
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
                    label="Is there food delivery?"
                  />
                </Grid>
              )}
              {userType === USER_TYPE.DELIVERY_COMPANY && (
                <Grid item xs={12} lg={6}>
                  <FormControl>
                    <FormLabel id="delivery-type-label">
                      Delivery Type
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
                          label={option}
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
                    label="deliveryCarsNum"
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
                    label="deliveryMotorsNum"
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
                <Typography>Location Info:</Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
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
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="addressDetails"
                  name="addressDetails"
                  label="address Details"
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
                  label="floor Number"
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
                  <FormLabel id="location-type-label">Location Type</FormLabel>
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
                        label={option}
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

export default AddUserPage;
