import { useParams } from "react-router-dom";
import {
  useAddVehicleMutation,
  useEditVehicleMutation,
  useGetVehicleByIdQuery,
} from "../../apis/vehicle/queries";
import { VehicleModel, VehicleType } from "../../apis/vehicle/type";
import { Form, Formik, FormikHelpers } from "formik";
import {
  Box,
  Button,
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
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import { useState } from "react";

const AddEditVehiclePage = () => {
  const { id, ownerId } = useParams<{
    id: string;
    ownerId: string;
  }>();
  const { data: vehicleInfo } = useGetVehicleByIdQuery(id ?? "");
  const { mutate: addVehicle } = useAddVehicleMutation();
  const { mutate: editVehicle } = useEditVehicleMutation();
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const initialValues: VehicleModel = {
    ...(id && { _id: id }),
    ...(ownerId && { creator: ownerId }),
    name: vehicleInfo?.name ?? "",
    description: vehicleInfo?.description ?? "",
    price: vehicleInfo?.price ?? 0,
    kilometers: vehicleInfo?.kilometers ?? 0,
    year: vehicleInfo?.year,
    location: vehicleInfo?.location ?? "",
    type: vehicleInfo?.type ?? "",
    category: vehicleInfo?.category ?? VehicleType.CARS,
    contactNumber: vehicleInfo?.contactNumber ?? "",
    exteriorColor: vehicleInfo?.exteriorColor,
    interiorColor: vehicleInfo?.interiorColor,
    doors: vehicleInfo?.doors,
    bodyCondition: vehicleInfo?.bodyCondition,
    bodyType: vehicleInfo?.bodyType,
    mechanicalCondition: vehicleInfo?.mechanicalCondition,
    seatingCapacity: vehicleInfo?.seatingCapacity,
    ...(vehicleInfo?.numofCylinders && {
      numofCylinders: vehicleInfo?.numofCylinders,
    }),
    transmissionType: vehicleInfo?.transmissionType,
    horsepower: vehicleInfo?.horsepower,
    fuelType: vehicleInfo?.fuelType,
    extras: vehicleInfo?.extras,
    technicalFeatures: vehicleInfo?.technicalFeatures,
    steeringSide: vehicleInfo?.steeringSide,
    guarantee: vehicleInfo?.guarantee,
    forWhat: vehicleInfo?.forWhat,
    regionalSpecs: vehicleInfo?.regionalSpecs,
    aircraftType: vehicleInfo?.aircraftType,
    manufacturer: vehicleInfo?.manufacturer,
    vehicleModel: vehicleInfo?.vehicleModel,
    maxSpeed: vehicleInfo?.maxSpeed,
    maxDistance: vehicleInfo?.maxDistance,
    shipType: vehicleInfo?.shipType,
    country: "AE",
  };
  const handleSubmit = (
    values: VehicleModel,
    { setSubmitting }: FormikHelpers<VehicleModel>
  ) => {
    id
      ? editVehicle(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addVehicle(values, {
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
        {id ? `Edit ${vehicleInfo?.name}` : `Add New Vehicle`}
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
                  <Typography>Select Vehicle Type</Typography>
                  <Select
                    value={values.category}
                    onChange={e =>
                      setFieldValue("category", e.target.value as VehicleType)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Select vehicle type" }}
                    IconComponent={ExpandMoreIcon}
                  >
                    <MenuItem value={VehicleType.CARS}>CARS</MenuItem>
                    <MenuItem value={VehicleType.PLANES}>PLANES</MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
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

              {values.category === VehicleType.CARS && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="kilometers"
                    name="kilometers"
                    label="kilometers"
                    type="number"
                    value={values.kilometers}
                    onChange={handleChange}
                    error={touched.kilometers && Boolean(errors.kilometers)}
                    helperText={touched.kilometers && errors.kilometers}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              {values.category === VehicleType.PLANES && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="vehicleModel"
                    name="vehicleModel"
                    label="vehicle Model"
                    type="text"
                    value={values.vehicleModel}
                    onChange={handleChange}
                    error={touched.vehicleModel && Boolean(errors.vehicleModel)}
                    helperText={touched.vehicleModel && errors.vehicleModel}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              {values.category === VehicleType.PLANES && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="manufacturer"
                    name="manufacturer"
                    label="manufacturer"
                    type="text"
                    value={values.manufacturer}
                    onChange={handleChange}
                    error={touched.manufacturer && Boolean(errors.manufacturer)}
                    helperText={touched.manufacturer && errors.manufacturer}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="year"
                  name="year"
                  label="Year"
                  type="date"
                  value={values.year}
                  onChange={handleChange}
                  error={touched.year && Boolean(errors.year)}
                  helperText={touched.year && errors.year}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="address"
                  type="text"
                  value={values.location}
                  onChange={handleChange}
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="maxSpeed"
                  name="maxSpeed"
                  label="maxSpeed"
                  type="text"
                  value={values.maxSpeed}
                  onChange={handleChange}
                  error={touched.maxSpeed && Boolean(errors.maxSpeed)}
                  helperText={touched.maxSpeed && errors.maxSpeed}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="exteriorColor"
                  name="exteriorColor"
                  label="exterior Color"
                  type="text"
                  value={values.exteriorColor}
                  onChange={handleChange}
                  error={touched.exteriorColor && Boolean(errors.exteriorColor)}
                  helperText={touched.exteriorColor && errors.exteriorColor}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="interiorColor"
                  name="interiorColor"
                  label="interior Color"
                  type="text"
                  value={values.interiorColor}
                  onChange={handleChange}
                  error={touched.interiorColor && Boolean(errors.interiorColor)}
                  helperText={touched.interiorColor && errors.interiorColor}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="doors"
                  name="doors"
                  label="doors"
                  type="number"
                  value={values.doors}
                  onChange={handleChange}
                  error={touched.doors && Boolean(errors.doors)}
                  helperText={touched.doors && errors.doors}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="bodyCondition"
                  name="bodyCondition"
                  label="body Condition"
                  type="text"
                  value={values.bodyCondition}
                  onChange={handleChange}
                  error={touched.bodyCondition && Boolean(errors.bodyCondition)}
                  helperText={touched.bodyCondition && errors.bodyCondition}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="bodyType"
                  name="bodyType"
                  label="body Type"
                  type="text"
                  value={values.bodyType}
                  onChange={handleChange}
                  error={touched.bodyType && Boolean(errors.bodyType)}
                  helperText={touched.bodyType && errors.bodyType}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="mechanicalCondition"
                  name="mechanicalCondition"
                  label="mechanical Condition"
                  type="text"
                  value={values.mechanicalCondition}
                  onChange={handleChange}
                  error={
                    touched.mechanicalCondition &&
                    Boolean(errors.mechanicalCondition)
                  }
                  helperText={
                    touched.mechanicalCondition && errors.mechanicalCondition
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="seatingCapacity"
                  name="seatingCapacity"
                  label="seating Capacity"
                  type="number"
                  value={values.seatingCapacity}
                  onChange={handleChange}
                  error={
                    touched.seatingCapacity && Boolean(errors.seatingCapacity)
                  }
                  helperText={touched.seatingCapacity && errors.seatingCapacity}
                  sx={{ mb: 2 }}
                />
              </Grid>
              {values.category === VehicleType.CARS && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="numofCylinders"
                    name="numofCylinders"
                    label="num of Cylinders"
                    type="number"
                    value={values.numofCylinders}
                    onChange={handleChange}
                    error={
                      touched.numofCylinders && Boolean(errors.numofCylinders)
                    }
                    helperText={touched.numofCylinders && errors.numofCylinders}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              {values.category === VehicleType.CARS && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="transmissionType"
                    name="transmissionType"
                    label="transmission Type"
                    type="text"
                    value={values.transmissionType}
                    onChange={handleChange}
                    error={
                      touched.transmissionType &&
                      Boolean(errors.transmissionType)
                    }
                    helperText={
                      touched.transmissionType && errors.transmissionType
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="horsepower"
                  name="horsepower"
                  label="horse power"
                  type="text"
                  value={values.horsepower}
                  onChange={handleChange}
                  error={touched.horsepower && Boolean(errors.horsepower)}
                  helperText={touched.horsepower && errors.horsepower}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="fuelType"
                  name="fuelType"
                  label="fuel Type"
                  type="text"
                  value={values.fuelType}
                  onChange={handleChange}
                  error={touched.fuelType && Boolean(errors.fuelType)}
                  helperText={touched.fuelType && errors.fuelType}
                  sx={{ mb: 2 }}
                />
              </Grid>
              {values.category === VehicleType.CARS && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="extras"
                    name="extras"
                    label="extras"
                    type="text"
                    value={values.extras}
                    onChange={handleChange}
                    error={touched.extras && Boolean(errors.extras)}
                    helperText={touched.extras && errors.extras}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              {values.category === VehicleType.CARS && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="technicalFeatures"
                    name="technicalFeatures"
                    label="technical Features"
                    type="text"
                    value={values.technicalFeatures}
                    onChange={handleChange}
                    error={
                      touched.technicalFeatures &&
                      Boolean(errors.technicalFeatures)
                    }
                    helperText={
                      touched.technicalFeatures && errors.technicalFeatures
                    }
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              {values.category === VehicleType.CARS && (
                <Grid item xs={12} lg={6}>
                  <TextField
                    fullWidth
                    id="steeringSide"
                    name="steeringSide"
                    label="steering Side"
                    type="text"
                    value={values.steeringSide}
                    onChange={handleChange}
                    error={touched.steeringSide && Boolean(errors.steeringSide)}
                    helperText={touched.steeringSide && errors.steeringSide}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              )}
              {values.category === VehicleType.CARS && (
                <Grid item xs={12} lg={6}>
                  <FormControl>
                    <FormLabel id="regionalSpecs-label">
                      regional Specs
                    </FormLabel>
                    <RadioGroup
                      id="regionalSpecs"
                      aria-labelledby="regionalSpecs-label"
                      value={values.regionalSpecs}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setFieldValue("regionalSpecs", event.target.value);
                      }}
                      row
                    >
                      {["gcc", "Incoming"].map(option => (
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
              <Grid item xs={12} lg={6}>
                <FormControl>
                  <FormLabel id="type-label">Condition</FormLabel>
                  <RadioGroup
                    id="type"
                    aria-labelledby="type-label"
                    value={values.type}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("type", event.target.value);
                    }}
                    row
                  >
                    {["new", "used"].map(option => (
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
                <FormControl>
                  <FormLabel id="forWhat-label">For What</FormLabel>
                  <RadioGroup
                    id="forWhat"
                    aria-labelledby="forWhat-label"
                    value={values.forWhat}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("forWhat", event.target.value);
                    }}
                    row
                  >
                    {["buy", "rent"].map(option => (
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
                  oldImg={vehicleInfo?.imageUrl}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Vehicle Images
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={event => {
                      if (event.currentTarget.files) {
                        setFieldValue(
                          "carimages",
                          Array.from(event.currentTarget.files)
                        );
                      }
                    }}
                  />
                </Button>
                {values.carImages && values.carImages.length > 0 && (
                  <Typography>
                    {values.carImages.length} images selected
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Vehicle Video
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
                    buttonText={id ? "Edit Vehicle" : "Add Vehicle"}
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

export default AddEditVehiclePage;
