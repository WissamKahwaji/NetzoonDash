import { Box, Button, Grid, Typography } from "@mui/material";
import { useGetNewsListQuery } from "../../apis/news/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { useNavigate } from "react-router-dom";
import NewsCard from "../../components/items/cards/news_card";

const NewsListPage = () => {
  const { data: newsInfo, isError, isLoading } = useGetNewsListQuery();
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
        News
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
          Add News
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
