import { useTranslation } from "react-i18next";
import {
  useEditFeesMutation,
  useGetFeesInfoQuery,
} from "../../apis/fees/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { FeesModel } from "../../apis/fees/type";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";

const FeesPage = () => {
  const { t } = useTranslation();

  const { mutate: editFees } = useEditFeesMutation();
  const { data: dataInfo, isError, isLoading } = useGetFeesInfoQuery();

  const handleSubmit = async (
    values: FeesModel,
    { setSubmitting }: FormikHelpers<FeesModel>
  ) => {
    editFees(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  const initialValues: FeesModel = {
    adsFees: dataInfo?.adsFees,
    dealsFees: dataInfo?.dealsFees,
    feesFromBuyer: dataInfo?.feesFromBuyer,
    feesFromSeller: dataInfo?.feesFromSeller,
  };

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
        {t("fees_in_netzoon")}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <Grid container justifyContent={"center"} spacing={3}>
              <Grid item xs={12} lg={6}>
                <Stack spacing={2}>
                  <Typography>{t("fees_from_seller")}</Typography>
                  <TextField
                    fullWidth
                    id="feesFromSeller"
                    name="feesFromSeller"
                    label={t("fees_from_seller")}
                    type="number"
                    value={values.feesFromSeller}
                    onChange={handleChange}
                    error={
                      touched.feesFromSeller && Boolean(errors.feesFromSeller)
                    }
                    helperText={touched.feesFromSeller && errors.feesFromSeller}
                    sx={{ mb: 2, direction: "ltr" }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Stack spacing={2}>
                  <Typography>{t("service_fee_from_buyer")}</Typography>
                  <TextField
                    fullWidth
                    id="feesFromBuyer"
                    name="feesFromBuyer"
                    label={t("service_fee_from_buyer")}
                    type="number"
                    value={values.feesFromBuyer}
                    onChange={handleChange}
                    error={
                      touched.feesFromBuyer && Boolean(errors.feesFromBuyer)
                    }
                    helperText={touched.feesFromBuyer && errors.feesFromBuyer}
                    sx={{ mb: 2, direction: "ltr" }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Stack spacing={2}>
                  <Typography>{t("deals_fee")}</Typography>
                  <TextField
                    fullWidth
                    id="dealsFees"
                    name="dealsFees"
                    label={t("deals_fee")}
                    value={values.dealsFees}
                    type="number"
                    onChange={handleChange}
                    error={touched.dealsFees && Boolean(errors.dealsFees)}
                    helperText={touched.dealsFees && errors.dealsFees}
                    sx={{ mb: 2, direction: "ltr" }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Stack spacing={2}>
                  <Typography>{t("ads_fee")}</Typography>
                  <TextField
                    fullWidth
                    id="adsFees"
                    name="adsFees"
                    label={t("ads_fee")}
                    value={values.adsFees}
                    type="number"
                    onChange={handleChange}
                    error={touched.adsFees && Boolean(errors.adsFees)}
                    helperText={touched.adsFees && errors.adsFees}
                    sx={{ mb: 2, direction: "ltr" }}
                  />
                </Stack>
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

export default FeesPage;
