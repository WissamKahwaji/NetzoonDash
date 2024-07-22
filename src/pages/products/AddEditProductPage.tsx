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
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter product name"),
  condition: Yup.string().required("Please enter product condition"),
  description: Yup.string().required("Please enter product description"),
  price: Yup.number().required("Please enter product price"),
  weight: Yup.number().required("Please enter product weight"),
});

const AddEditProductPage = () => {
  const { country } = useCountry();
  const { t } = useTranslation();
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
    quantity: productInfo?.quantity ?? 0,
    weight: productInfo?.weight ?? 0,
    guarantee: productInfo?.guarantee ?? false,
    address: productInfo?.address ?? "",
    color: productInfo?.color ?? "",
    discountPercentage: productInfo?.discountPercentage ?? 0,
    country: country ?? "AE",
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
          ? `${t("edit")} ${productInfo?.name}`
          : `${t("add_product_in")} ${categoryInfo?.department.name}`}
      </Typography>
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
                  id="name"
                  name="name"
                  label={t("product_name")}
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
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
                  id="price"
                  name="price"
                  label={t("price")}
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
                  label={t("weight_in_KG")}
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
                  label={t("quantity")}
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
                  label={t("product_color")}
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
                  label={t("discount_percentage")}
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
                  <FormLabel id="condition-label">{t("condition")}</FormLabel>
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
                        label={t(option)}
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
                  label={t("madeIn")}
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
                  label={t("product_image")}
                  oldImg={productInfo?.imageUrl}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  {t("upload_product_images")}
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
                  {t("upload_product_video")}
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
                    buttonText={id ? t("edit_product") : t("add_product")}
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
