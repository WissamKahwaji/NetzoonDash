import { useTranslation } from "react-i18next";
import {
  useEditPrivacyInfoMutation,
  useGetPrivacyInfoQuery,
} from "../../apis/privacy_policy/queries";
import { PrivacyInputModel } from "../../apis/privacy_policy/type";
import LoadingPage from "../loading-page/LoadingPage";
import { Form, Formik, FormikHelpers } from "formik";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";

const EditTermsPage = () => {
  const { t } = useTranslation();

  const { mutate: editTerms } = useEditPrivacyInfoMutation();
  const { data: dataInfo, isError, isLoading } = useGetPrivacyInfoQuery();

  const handleSubmit = async (
    values: PrivacyInputModel,
    { setSubmitting }: FormikHelpers<PrivacyInputModel>
  ) => {
    editTerms(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  const initialValues: PrivacyInputModel = {
    termofUseEn: dataInfo && dataInfo[0].termofUseEn,
    termofUse: dataInfo && dataInfo[0].termofUse,
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
        {t("edit_terms_of_use")}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <Form>
            <Grid container justifyContent={"center"} spacing={3}>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  id="termofUseEn"
                  name="termofUseEn"
                  label={t("terms_of_use_en")}
                  multiline
                  minRows={1}
                  maxRows={10}
                  value={values.termofUseEn}
                  onChange={handleChange}
                  error={touched.termofUseEn && Boolean(errors.termofUseEn)}
                  helperText={touched.termofUseEn && errors.termofUseEn}
                  sx={{ mb: 2, direction: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  id="termofUse"
                  name="termofUse"
                  label={t("terms_of_use_ar")}
                  multiline
                  minRows={1}
                  maxRows={10}
                  value={values.termofUse}
                  onChange={handleChange}
                  error={touched.termofUse && Boolean(errors.termofUse)}
                  helperText={touched.termofUse && errors.termofUse}
                  sx={{ mb: 2, direction: "rtl" }}
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

export default EditTermsPage;
