import { useNavigate } from "react-router-dom";
import { useGetSliderInfoQuery } from "../../apis/sliders/queries";
import LoadingPage from "../loading-page/LoadingPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const SlidersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: sliderInfo, isError, isLoading } = useGetSliderInfoQuery();

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "fit-content",
          }}
          onClick={() => {
            navigate(`${sliderInfo?._id}/edit`);
          }}
        >
          {t("edit_the_sliders")}
        </Button>
      </Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        {t("main_slider")}
      </Typography>

      {sliderInfo && sliderInfo.secondSlider.length > 1 ? (
        <>
          <Slider {...sliderSettings}>
            {sliderInfo.secondSlider.map((image, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <img
                  src={image}
                  alt={`Second Slider Image ${index}`}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                  }}
                  crossOrigin="anonymous"
                />
              </Box>
            ))}
          </Slider>
        </>
      ) : (
        sliderInfo &&
        sliderInfo.secondSlider.length > 0 && (
          <>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={sliderInfo?.secondSlider[0]}
                alt={`Second Slider Image`}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "contain",
                }}
                crossOrigin="anonymous"
              />
            </Box>
          </>
        )
      )}
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}
      >
        {t("second_slider")}
      </Typography>
      {sliderInfo && sliderInfo.mainSlider.length > 1 ? (
        <>
          <Slider {...sliderSettings}>
            {sliderInfo.mainSlider.map((image, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <img
                  src={image}
                  alt={`Main Slider Image ${index}`}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                  }}
                  crossOrigin="anonymous"
                />
              </Box>
            ))}
          </Slider>
        </>
      ) : (
        <>
          {sliderInfo && sliderInfo.mainSlider.length > 0 && (
            <Box sx={{ textAlign: "center" }}>
              <img
                src={sliderInfo?.mainSlider[0]}
                alt={`Main Slider Image`}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "contain",
                }}
                crossOrigin="anonymous"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SlidersPage;
