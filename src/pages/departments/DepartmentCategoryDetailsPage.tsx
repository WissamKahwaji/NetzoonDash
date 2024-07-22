/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { Params } from "./type";
import {
  useAddDepartmentCategoryMutation,
  useEditDepartmentCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../apis/departments/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { EditDepartmentCategoryParams } from "../../apis/departments/type";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
// import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageCropper from "../../components/items/buttons/image-cropper/ImageCropper";

const DepartmentCategoryDetailsPage = () => {
  const { t } = useTranslation();
  const { categoryId, departmentId } = useParams<Params>();
  const {
    data: categoryInfo,
    isLoading,
    isError,
  } = useGetCategoryByIdQuery(categoryId ?? "");
  const { mutate: editDepartmentCategory } =
    useEditDepartmentCategoryMutation();
  const { mutate: addDepartmentCategory } = useAddDepartmentCategoryMutation();

  const [initialValues, setInitialValues] =
    useState<EditDepartmentCategoryParams>({
      _id: categoryId ?? departmentId ?? "",
      name: "",
      nameAr: "",
    });

  useEffect(() => {
    if (categoryId && categoryInfo) {
      setInitialValues({
        _id: categoryId,
        name: categoryInfo.name,
        nameAr: categoryInfo.nameAr,
      });
    } else {
      setInitialValues({
        _id: departmentId ?? "",
        name: "",
        nameAr: "",
      });
    }
  }, [categoryId, categoryInfo, departmentId]);
  const handleSubmit = async (
    values: EditDepartmentCategoryParams,
    { setSubmitting }: FormikHelpers<EditDepartmentCategoryParams>
  ) => {
    categoryId
      ? editDepartmentCategory(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addDepartmentCategory(values, {
          onSettled() {
            setSubmitting(false);
          },
        });
  };
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState<string>(
    categoryInfo?.imageUrl ?? ""
  );
  const handleCropComplete = (croppedFile: File, setFieldValue: any) => {
    setCroppedImageFile(croppedFile);
    console.log(croppedImageFile?.name);
    setFieldValue("image", croppedFile);
    const reader = new FileReader();
    reader.readAsDataURL(croppedFile);
    reader.onloadend = () => {
      setCroppedImageDataUrl(reader.result as string);
    };
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 6,
        }}
      >
        {categoryInfo?.name}
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
            <Grid container justifyContent={"center"} spacing={3}>
              <Grid item xs={12} md={10}>
                {/* <ImageDragDropField
                  name="image"
                  label={t("category_image")}
                  oldImg={categoryInfo?.imageUrl as string}
                /> */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    justifyContent: "center",
                    justifyItems: "center",
                    width: "100%",
                  }}
                >
                  <img
                    src={
                      croppedImageDataUrl != ""
                        ? croppedImageDataUrl
                        : categoryInfo?.imageUrl
                    }
                    alt="Cropped"
                    style={{ maxWidth: 200, height: 200 }}
                  />
                  <ImageCropper
                    onCropComplete={croppedFile => {
                      handleCropComplete(croppedFile, setFieldValue);
                    }}
                    aspect={1}
                    titleIcon={t("category_image")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  name="name"
                  fullWidth
                  label={t("category_name")}
                  error={touched.name && !!errors.name}
                  onChange={handleChange}
                  value={values.name}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  name="nameAr"
                  fullWidth
                  label={t("category_name_ar")}
                  error={touched.nameAr && !!errors.nameAr}
                  onChange={handleChange}
                  value={values.nameAr}
                />
              </Grid>
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

export default DepartmentCategoryDetailsPage;
