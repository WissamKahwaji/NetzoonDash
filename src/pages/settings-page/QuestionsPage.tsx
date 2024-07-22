import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useGetQuestionsInfoQuery } from "../../apis/questions/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const QuestionsPage = () => {
  const { t } = useTranslation();
  const {
    data: questionsInfo,
    isError,
    isLoading,
  } = useGetQuestionsInfoQuery();

  if (isError) return <Box sx={{ textAlign: "center", mt: 4 }}>Error !!!</Box>;
  if (isLoading) return <LoadingPage />;

  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <Typography
        component="h1"
        sx={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: 4,
          color: "primary.main",
        }}
      >
        {t("questions")}
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {questionsInfo && questionsInfo.length > 0 ? (
          questionsInfo.map((question, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {question.text}
                  </Typography>
                  {question.createdAt && (
                    <Typography variant="caption" color="text.secondary">
                      {format(new Date(question.createdAt), "PPP")}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            component="h5"
            sx={{
              textAlign: "center",
              fontSize: "1.25rem",
              fontWeight: "bold",
              textTransform: "capitalize",
              mt: 4,
              color: "text.secondary",
              width: "100%",
            }}
          >
            There are no questions yet.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default QuestionsPage;
