/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useEditSlidersInfoMutation,
  useGetSliderInfoQuery,
} from "../../apis/sliders/queries";
import { SliderInputModel } from "../../apis/sliders/type";
import LoadingPage from "../loading-page/LoadingPage";
import { Formik, Form, FieldArray, FormikHelpers } from "formik";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import getCroppedImg from "../../components/items/buttons/image-cropper/CropImageHelper";

const EditSlidersPage = () => {
  const { t } = useTranslation();
  const { sliderId } = useParams<{ sliderId: string }>();
  const { data: sliderInfo, isError, isLoading } = useGetSliderInfoQuery();
  const { mutate: editSliderInfo } = useEditSlidersInfoMutation();

  const initialValues: SliderInputModel = {
    ...(sliderId && { _id: sliderId }),
    removeMainSliderImages: [],
    removeSecondSliderImages: [],
    mainSlider: sliderInfo?.mainSlider || [],
    secondSlider: sliderInfo?.secondSlider || [],
  };
  const handleSubmit = (
    values: SliderInputModel,
    { setSubmitting }: FormikHelpers<SliderInputModel>
  ) => {
    editSliderInfo(values, {
      onSettled() {
        setSubmitting(false);
      },
    });
  };
  const [croppedImages, setCroppedImages] = useState<File[]>([]);
  const [croppedSecondImages, setCroppedSecondImages] = useState<File[]>([]);

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        if (event.target && event.target.result) {
          img.src = event.target.result as string;
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const handleChoosenMainImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    push: any
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(0, 9);

      const croppedFiles = await Promise.all(
        filesArray.map(async file => {
          const image = await loadImage(file);

          const pixelCrop = {
            x: (image.width - 1200) / 2,
            y: (image.height - 600) / 2,
            width: 1200,
            height: 600,
          };

          const croppedFile = await getCroppedImg(
            URL.createObjectURL(file),
            pixelCrop,
            file.name
          );
          return croppedFile;
        })
      );

      setFieldValue("mainSliderImg", [...croppedImages, ...croppedFiles]);

      const fileArray = Array.from([...croppedFiles]).map(file =>
        URL.createObjectURL(file)
      );
      fileArray.forEach(url => push(url));
      setCroppedImages([...croppedImages, ...croppedFiles]);
    }
  };
  const handleChoosenSecondImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
    push: any
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(0, 9);

      const croppedFiles = await Promise.all(
        filesArray.map(async file => {
          const image = await loadImage(file);

          const pixelCrop = {
            x: (image.width - 1440) / 2,
            y: (image.height - 300) / 2,
            width: 1440,
            height: 300,
          };

          const croppedFile = await getCroppedImg(
            URL.createObjectURL(file),
            pixelCrop,
            file.name
          );
          return croppedFile;
        })
      );

      setFieldValue("mainSliderImg", [...croppedSecondImages, ...croppedFiles]);

      const fileArray = Array.from([...croppedFiles]).map(file =>
        URL.createObjectURL(file)
      );
      fileArray.forEach(url => push(url));
      setCroppedSecondImages([...croppedSecondImages, ...croppedFiles]);
    }
  };
  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingPage />;

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
        {t("edit_sliders")}
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray name="mainSlider">
              {({ push, remove }) => (
                <>
                  <Typography variant="h6">
                    {t("main_slider")}{" "}
                    <span
                      style={{ fontSize: "12px" }}
                    >{`(size should be "W: 1440px * H: 300px")`}</span>
                  </Typography>
                  <Grid container spacing={2}>
                    {values.secondSlider &&
                      values.secondSlider.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Box sx={{ position: "relative" }}>
                            <img
                              src={image}
                              alt={`Second Slider ${index}`}
                              style={{ width: "100%", height: "auto" }}
                              crossOrigin="anonymous"
                            />
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                remove(index);
                                setFieldValue("removeSecondSliderImages", [
                                  ...values.removeSecondSliderImages,
                                  image,
                                ]);
                              }}
                            >
                              {t("remove")}
                            </Button>
                          </Box>
                        </Grid>
                      ))}
                    <Grid item xs={12}>
                      <Button variant="contained" component="label">
                        {t("add_main_slider_images")}
                        {/* <input
                          type="file"
                          multiple
                          accept="image/*"
                          hidden
                          onChange={event => {
                            const files = event.target.files;
                            if (files) {
                              const fileArray = Array.from(files).map(file =>
                                URL.createObjectURL(file)
                              );
                              fileArray.forEach(url => push(url));
                              setFieldValue(
                                "secondSliderImg",
                                Array.from(files)
                              );
                            }
                          }}
                        /> */}
                        <input
                          type="file"
                          accept="image/png, image/jpeg image/jpg"
                          className="absolute w-full h-full opacity-0 cursor-pointer"
                          multiple
                          hidden
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChoosenSecondImages(
                              event,
                              setFieldValue,
                              push
                            );
                          }}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </FieldArray>

            <FieldArray name="secondSlider">
              {({ push, remove }) => (
                <>
                  <Typography variant="h6" sx={{ marginTop: "20px" }}>
                    {t("second_slider")}{" "}
                    <span
                      style={{ fontSize: "12px" }}
                    >{`(size should be "W: 1200px * H: 600px")`}</span>
                  </Typography>
                  <Grid container spacing={2}>
                    {values.mainSlider &&
                      values.mainSlider.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Box
                            sx={{
                              position: "relative",
                            }}
                          >
                            <img
                              src={image}
                              alt={`Main Slider ${index}`}
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                              crossOrigin="anonymous"
                            />
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                remove(index);
                                setFieldValue("removeMainSliderImages", [
                                  ...values.removeMainSliderImages,
                                  image,
                                ]);
                              }}
                            >
                              {t("remove")}
                            </Button>
                          </Box>
                        </Grid>
                      ))}
                    <Grid item xs={12}>
                      <Button variant="contained" component="label">
                        {t("add_second_slider_images")}
                        {/* <input
                          type="file"
                          multiple
                          accept="image/*"
                          hidden
                          onChange={event => {
                            const files = event.target.files;
                            if (files) {
                              const fileArray = Array.from(files).map(file =>
                                URL.createObjectURL(file)
                              );
                              fileArray.forEach(url => push(url));
                              setFieldValue("mainSliderImg", Array.from(files));
                            }
                          }}
                        /> */}
                        <input
                          type="file"
                          accept="image/png, image/jpeg image/jpg"
                          className="absolute w-full h-full opacity-0 cursor-pointer"
                          multiple
                          hidden
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChoosenMainImages(event, setFieldValue, push);
                          }}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </FieldArray>

            <Box sx={{ marginTop: "20px", textAlign: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                {t("save")}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditSlidersPage;
