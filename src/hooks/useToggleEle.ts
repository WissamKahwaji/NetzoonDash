import React from "react";

const useToggleEle = (initialState: boolean) => {
  const [open, setOpen] = React.useState(initialState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return [open, handleOpen, handleClose, setOpen] as const;
};

export default useToggleEle;
