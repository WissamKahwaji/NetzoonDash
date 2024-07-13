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
import { DeleteAdsDialogProps } from "./type";
import { useDeleteAdsMutation } from "../../../../apis/ads/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteAdsDialog = ({ open, onClose, ads }: DeleteAdsDialogProps) => {
  const { mutate: deleteAds } = useDeleteAdsMutation();
  const handleDeleteAds = () => {
    deleteAds(ads.id);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${ads.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteAds}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAdsDialog;
