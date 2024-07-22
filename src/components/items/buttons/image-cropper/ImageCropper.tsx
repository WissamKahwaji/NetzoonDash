import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { CloudUpload } from "@mui/icons-material";
import getCroppedImg from "./CropImageHelper";
import { useTranslation } from "react-i18next";
import { Box, Button, Slider, Typography, IconButton } from "@mui/material";

interface ImageCropperProps {
  onCropComplete: (croppedFile: File) => void;
  aspect?: number | undefined;
  icon?: React.ReactNode;
  titleIcon?: string;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  onCropComplete,
  aspect,
  icon = <CloudUpload fontSize="large" color="action" />,
  titleIcon,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [originalFileName, setOriginalFileName] = useState<string | null>(null);

  const handleCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
        setOriginalFileName(file.name);
      };
    }
  };

  const handleCropImage = useCallback(async () => {
    if (!croppedArea || !image || !originalFileName) {
      return;
    }
    try {
      const croppedFile = await getCroppedImg(
        image,
        croppedArea,
        originalFileName
      );
      onCropComplete(croppedFile);
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  }, [croppedArea, image, originalFileName, onCropComplete]);

  const { t } = useTranslation();

  return (
    <Box>
      <Box mb={4}>
        {image ? (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgcolor="rgba(0, 0, 0, 0.5)"
            zIndex={50}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              bgcolor="background.paper"
              p={4}
              borderRadius={1}
              maxWidth="100%"
              width={{ xs: "90%", md: "30%" }}
            >
              <Box
                position="relative"
                width="100%"
                height={{ xs: "256px", md: "320px" }}
              >
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </Box>
              <Box mt={4}>
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(_e, value) => setZoom(value as number)}
                />
              </Box>
              <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setImage(null)}
                >
                  {t("cancel")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCropImage}
                >
                  {t("crop")}
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{ width: 100, height: 100 }}
            border="2px dashed"
            borderColor="text.secondary"
            borderRadius={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
              onChange={handleSelectFile}
            />
            <IconButton color="primary">{icon}</IconButton>
            {titleIcon && (
              <Typography variant="caption" color="textSecondary">
                {titleIcon}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageCropper;
