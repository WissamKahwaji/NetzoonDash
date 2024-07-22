import { useTranslation } from "react-i18next";
import { useGetPrivacyInfoQuery } from "../../apis/privacy_policy/queries";
import { Box, Button, Typography } from "@mui/material";
import LoadingPage from "../loading-page/LoadingPage";
import { Link } from "react-router-dom";

const TermsOfUsePage = () => {
  const { t, i18n } = useTranslation();
  const selectedLang = i18n.language;
  const { data: dataInfo, isError, isLoading } = useGetPrivacyInfoQuery();

  if (isError) return <Box sx={{ textAlign: "center", mt: 4 }}>Error !!!</Box>;
  if (isLoading) return <LoadingPage />;
  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <Typography
        component={"h1"}
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          textTransform: "capitalize",

          color: "black",
        }}
      >
        {t("terms_of_use")}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Link to={`edit`} reloadDocument>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: "fit-content",
              mb: 3,
            }}
            // onClick={() => {
            //   navigate(`add`);
            // }}
          >
            {t("edit_terms_of_use")}
          </Button>
        </Link>
      </Box>
      <Typography
        component={"h3"}
        sx={{
          textAlign: "start",
          fontSize: "1.25rem",
          mb: 3,
          color: "black",
          whiteSpace: "pre-line",
        }}
      >
        {dataInfo && selectedLang === "en"
          ? dataInfo[0].termofUseEn
          : dataInfo![0].termofUse}
      </Typography>
    </Box>
  );
};

export default TermsOfUsePage;
