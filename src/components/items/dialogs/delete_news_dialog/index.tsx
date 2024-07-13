/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import React from "react";

import { TransitionProps } from "@mui/material/transitions";
import { DeleteNewsDialogProps } from "./type";
import { useDeleteNewsMutation } from "../../../../apis/news/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteNewsDialog = ({ open, onClose, news }: DeleteNewsDialogProps) => {
  const { mutate: deleteNews } = useDeleteNewsMutation();
  const handleDeleteNews = () => {
    deleteNews(news.id);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${news.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteNews}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteNewsDialog;
