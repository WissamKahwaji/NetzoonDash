import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useGetNotificationsListQuery } from "../../apis/notification/queries";
import LoadingPage from "../loading-page/LoadingPage";
import { useTranslation } from "react-i18next";

const NotificationListPage = () => {
  const { t } = useTranslation();
  const {
    data: notificationInfo,
    isError,
    isLoading,
  } = useGetNotificationsListQuery();

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
        {t("notifications")}
      </Typography>
      <Grid
        container
        gap={4}
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {notificationInfo &&
          notificationInfo.map((noti, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Box p={1}>
                <Card>
                  <CardHeader
                    title={
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <CardMedia
                          component="img"
                          sx={{
                            objectFit: "contain",
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                          }}
                          crossOrigin="anonymous"
                          src={noti.userProfileImage}
                          alt={`${noti.username}'s profile photo`}
                        />
                        <Typography variant="h6">
                          {`${noti.username} added a ${noti.text} to ${noti.category}`}
                        </Typography>
                      </Stack>
                    }
                  />
                </Card>
                {/* <NewsCard
                  newsId={noti._id ?? ""}
                  imageUrl={news.imgUrl ?? ""}
                  name={news.title ?? ""}
                /> */}
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default NotificationListPage;
