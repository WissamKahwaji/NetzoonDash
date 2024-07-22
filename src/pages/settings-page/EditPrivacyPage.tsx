import { useTranslation } from "react-i18next";
import {
  useEditPrivacyInfoMutation,
  useGetPrivacyInfoQuery,
} from "../../apis/privacy_policy/queries";
import { PrivacyInputModel } from "../../apis/privacy_policy/type";
import { Formik, FormikHelpers } from "formik";
import LoadingPage from "../loading-page/LoadingPage";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Form } from "react-router-dom";
import LoadingButton from "../../components/items/buttons/loadingButtons/LoadingButton";

const EditPrivacyPage = () => {
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
    textEn: dataInfo && dataInfo[0].textEn,
    text: dataInfo && dataInfo[0].text,
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
        {t("edit_privacy_policy")}
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
                  id="textEn"
                  name="textEn"
                  label={t("privacy_policy_en")}
                  multiline
                  minRows={1}
                  maxRows={10}
                  value={values.textEn}
                  onChange={handleChange}
                  error={touched.textEn && Boolean(errors.textEn)}
                  helperText={touched.textEn && errors.textEn}
                  sx={{ mb: 2, direction: "ltr" }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  id="text"
                  name="text"
                  label={t("privacy_policy_ar")}
                  multiline
                  minRows={1}
                  maxRows={10}
                  value={values.text}
                  onChange={handleChange}
                  error={touched.text && Boolean(errors.text)}
                  helperText={touched.text && errors.text}
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

export default EditPrivacyPage;
