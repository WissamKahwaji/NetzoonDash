import { useParams } from "react-router-dom";
import {
  useAddDealMutation,
  useEditDealMutation,
  useGetDealByIdQuery,
} from "../../apis/deals/queiries";
import { DealsItemModel } from "../../apis/deals/type";

import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import ImageDragDropField from "../../components/items/inputs/imageDragDropFeild";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter deal name"),

  description: Yup.string().required("Please enter deal description"),
  companyName: Yup.string().required("Please enter deal seller"),
});
const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "";
  return typeof date === "string"
    ? date.split("T")[0]
    : date.toISOString().split("T")[0];
};

const AddEditDealPage = () => {
  const { country } = useCountry();
  const { t } = useTranslation();
  const { id, ownerId, categoryId } = useParams<{
    id: string;
    ownerId: string;
    categoryId: string;
  }>();
  const { data: dealInfo } = useGetDealByIdQuery(id ?? "");
  const { mutate: addDeal } = useAddDealMutation();
  const { mutate: editDeal } = useEditDealMutation();
  const initialValues: DealsItemModel = {
    ...(id && { _id: id }),
    country: country ?? "AE",
    description: dealInfo?.description ?? "",
    category: categoryId,
    companyName: dealInfo?.companyName ?? "",
    currentPrice: dealInfo?.currentPrice ?? 0,
    name: dealInfo?.name ?? "",
    owner: dealInfo?.owner ?? ownerId,
    imgUrl: dealInfo?.imgUrl ?? "",
    location: dealInfo?.location ?? "",
    prevPrice: dealInfo?.prevPrice ?? 0,
    startDate: formatDate(dealInfo?.startDate),
    endDate: formatDate(dealInfo?.endDate),
  };

  const handleSubmit = (
    values: DealsItemModel,
    { setSubmitting }: FormikHelpers<DealsItemModel>
  ) => {
    id
      ? editDeal(values, {
          onSettled() {
            setSubmitting(false);
          },
        })
      : addDeal(values, {
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
        {id ? `${t("edit")} ${dealInfo?.name}` : `${t("add_new_deal")}`}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label={t("deal_name")}
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
                  label={t("deal_description")}
                  type="text"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="companyName"
                  name="companyName"
                  label={t("seller")}
                  type="text"
                  value={values.companyName}
                  onChange={handleChange}
                  error={touched.companyName && Boolean(errors.companyName)}
                  helperText={touched.companyName && errors.companyName}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="prevPrice"
                  name="prevPrice"
                  label={t("previous_price")}
                  type="number"
                  value={values.prevPrice}
                  onChange={handleChange}
                  error={touched.prevPrice && Boolean(errors.prevPrice)}
                  helperText={touched.prevPrice && errors.prevPrice}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="currentPrice"
                  name="currentPrice"
                  label={t("current_price")}
                  type="number"
                  value={values.currentPrice}
                  onChange={handleChange}
                  error={touched.currentPrice && Boolean(errors.currentPrice)}
                  helperText={touched.currentPrice && errors.currentPrice}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="startDate"
                  name="startDate"
                  label={t("start_date")}
                  type="date"
                  value={values.startDate}
                  onChange={handleChange}
                  error={touched.startDate && Boolean(errors.startDate)}
                  helperText={touched.startDate && errors.startDate}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="endDate"
                  name="endDate"
                  label={t("end_date")}
                  type="date"
                  value={values.endDate}
                  onChange={handleChange}
                  error={touched.endDate && Boolean(errors.endDate)}
                  helperText={touched.endDate && errors.endDate}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label={t("location")}
                  type="text"
                  value={values.location}
                  onChange={handleChange}
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <ImageDragDropField
                  name="dealImage"
                  label={t("deal_image")}
                  oldImg={dealInfo?.imgUrl}
                />
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

export default AddEditDealPage;
