/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import "./style.css";
import { Box, Button } from "@mui/material";
import { useField } from "formik";

const ImageDragDropField = ({
  name,
  oldImg,
  label,
}: {
  name: string;
  label: string;
  oldImg?: string;
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [imgSrc, setImgSrc] = useState(oldImg || "");
  const [field, meta, helper] = useField({ name });

  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (oldImg) {
      setImgSrc(oldImg);
    }
  }, [oldImg]);

  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const imgSrc = URL.createObjectURL(e.dataTransfer.files[0]);
      setImgSrc(imgSrc);
      helper.setValue(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const imgSrc = URL.createObjectURL(e.target.files[0]);
      setImgSrc(imgSrc);
      helper.setValue(e.target.files[0]);
    }
  };

  const onButtonClick = (e: any) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleReset = () => {
    setImgSrc(oldImg || "");
    helper.setValue(null);
  };

  return (
    <>
      <Box className="form-file-upload" onDragEnter={handleDrag}>
        <label
          id={`label-${name}`}
          htmlFor={name}
          className={dragActive ? "drag-active label-file" : "label-file"}
          style={{
            overflow: "hidden",
            borderColor: meta.error ? "red" : "secondary",
          }}
        >
          <img
            src={
              imgSrc
                ? imgSrc
                : field.value
                ? URL.createObjectURL(field.value)
                : oldImg
            }
            alt="upload"
            style={{ width: "100%", maxWidth: "8rem" }}
            crossOrigin="anonymous"
          />
          <div>
            <p>{label}</p>
            <button className="upload-button" onClick={onButtonClick}>
              Drag and drop or Upload
            </button>
            {oldImg && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
                style={{ marginTop: "1rem" }}
              >
                Reset to Original
              </Button>
            )}
          </div>
        </label>
        <input
          ref={inputRef}
          type="file"
          id={name}
          className="input-file"
          accept="image/*"
          onChange={handleChange}
        />
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </Box>
    </>
  );
};

export default ImageDragDropField;
