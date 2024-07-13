import { useParams } from "react-router-dom";
import { Params } from "./type";
import { useGetCategoryByIdQuery } from "../../apis/departments/queries";
import LoadingPage from "../loading-page/LoadingPage";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { ProductModel } from "../../apis/product/type";
import {
  useAddProductMutation,
  useEditProdictMutation,
  useGetProductByIdQuery,
} from "../../apis/product/queries";
import { Form, Formik, FormikHelpers } from "formik";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import { useState } from "react";

const AddEditProductPage = () => {
  const { id, ownerId } = useParams<{ id: string; ownerId: string }>();

  const { categoryId } = useParams<Params>();
  const {
    data: categoryInfo,
    isError: isErrorCategory,
    isLoading: isLoadingCategory,
  } = useGetCategoryByIdQuery(categoryId ?? "");
  const { data: productInfo } = useGetProductByIdQuery(id ?? "");
  const { mutate: addProduct } = useAddProductMutation(
    categoryInfo?.department.name ?? "",
    categoryInfo?.name ?? ""
  );
  const { mutate: editProduct } = useEditProdictMutation();
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  // const navigate = useNavigate();
  if (isErrorCategory) return <div>Error !!!</div>;
  if (isLoadingCategory) return <LoadingPage />;
  const initialValues: ProductModel = {
    ...(id && { _id: id }),
    owner: productInfo?.owner ?? ownerId ?? "",
    name: productInfo?.name ?? "",
    condition: productInfo?.condition ?? "new",
    description: productInfo?.description ?? "",
    price: productInfo?.price ?? 0,
    quantity: productInfo?.quantity,
    weight: productInfo?.weight,
    guarantee: productInfo?.guarantee ?? false,
    address: productInfo?.address,
    color: productInfo?.color,
    discountPercentage: productInfo?.discountPercentage,
    country: "AE",
  };
  const handleSubmit = (
    values: ProductModel,
    { setSubmitting }: FormikHelpers<ProductModel>
  ) => {
    id
      ? editProduct(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addProduct(values, {
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
        {id
          ? `Edit ${productInfo?.name}`
          : `Add Product in ${categoryInfo?.department.name}`}
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
                  id="name"
                  name="name"
                  label="product name"
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
                  id="weight"
                  name="weight"
                  label="weight in KG"
                  type="number"
                  value={values.weight}
                  onChange={handleChange}
                  error={touched.weight && Boolean(errors.weight)}
                  helperText={touched.weight && errors.weight}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="quantity"
                  name="quantity"
                  label="quantity"
                  type="number"
                  value={values.quantity}
                  onChange={handleChange}
                  error={touched.quantity && Boolean(errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="color"
                  name="color"
                  label="product color"
                  type="text"
                  value={values.color}
                  onChange={handleChange}
                  error={touched.color && Boolean(errors.color)}
                  helperText={touched.color && errors.color}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="discountPercentage"
                  name="discountPercentage"
                  label="discount Percentage"
                  type="number"
                  value={values.discountPercentage}
                  onChange={handleChange}
                  error={
                    touched.discountPercentage &&
                    Boolean(errors.discountPercentage)
                  }
                  helperText={
                    touched.discountPercentage && errors.discountPercentage
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl>
                  <FormLabel id="condition-label">Condition</FormLabel>
                  <RadioGroup
                    id="condition-type"
                    aria-labelledby="condition-type-label"
                    value={values.condition}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("condition", event.target.value);
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
                <TextField
                  fullWidth
                  id="madeIn"
                  name="madeIn"
                  label="madeIn"
                  type="text"
                  value={values.madeIn}
                  onChange={handleChange}
                  error={touched.madeIn && Boolean(errors.madeIn)}
                  helperText={touched.madeIn && errors.madeIn}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <ImageDragDropField
                  name="image"
                  label="Product Image"
                  oldImg={productInfo?.imageUrl}
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
                          "productimages",
                          Array.from(event.currentTarget.files)
                        );
                      }
                    }}
                  />
                </Button>
                {values.productimages && values.productimages.length > 0 && (
                  <Typography>
                    {values.productimages.length} images selected
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
                    buttonText={id ? "Edit Product" : "Add Product"}
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

export default AddEditProductPage;
