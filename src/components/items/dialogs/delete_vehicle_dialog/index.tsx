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
import { DeleteVehicleDialogProps } from "./type";
import { useDeleteVehicleMutation } from "../../../../apis/vehicle/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteVehicleDialog = ({
  open,
  onClose,
  vehicle,
}: DeleteVehicleDialogProps) => {
  const { mutate: deleteVehicle } = useDeleteVehicleMutation();
  const handleDeleteVehicle = () => {
    deleteVehicle(vehicle.id);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${vehicle.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteVehicle}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteVehicleDialog;
