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
import { DeleteUserDialogProps } from "./type";
import { useDeleteUserAccountMutation } from "../../../../apis/users/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteUserDialog = ({ open, onClose, user }: DeleteUserDialogProps) => {
  const { mutate: deleteUserAccount } = useDeleteUserAccountMutation();
  const handleDeleteUser = () => {
    deleteUserAccount(user.id);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${user.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteUser}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
