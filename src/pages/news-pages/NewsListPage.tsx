import { Box, Button, Grid, Typography } from "@mui/material";
import { useGetNewsListQuery } from "../../apis/news/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { useNavigate } from "react-router-dom";
import NewsCard from "../../components/items/cards/news_card";
import { useTranslation } from "react-i18next";
import { useCountry } from "../../context/CountryContext";
import { useEffect } from "react";

const NewsListPage = () => {
  const { country } = useCountry();
  const { t } = useTranslation();
  const {
    data: newsInfo,
    isError,
    isLoading,
    refetch,
  } = useGetNewsListQuery(country);

  useEffect(() => {
    refetch();
  }, [refetch, country]);

  const navigate = useNavigate();

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
          mb: 3,
        }}
      >
        {t("news")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "40px",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "fit-content",
          }}
          onClick={() => {
            navigate(`owner`);
          }}
        >
          {t("add_news")}
        </Button>
      </Box>
      <Grid container gap={4}>
        {newsInfo &&
          newsInfo.map((news, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box p={1}>
                <NewsCard
                  newsId={news._id ?? ""}
                  imageUrl={news.imgUrl ?? ""}
                  name={news.title ?? ""}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default NewsListPage;
