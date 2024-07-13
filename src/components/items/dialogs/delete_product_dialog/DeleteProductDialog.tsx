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

import { DeleteProductDialogProps } from "./type";
import { useDeleteProductMutation } from "../../../../apis/product/queries";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteProductDialog = ({
  open,
  onClose,
  product,
}: DeleteProductDialogProps) => {
  const { mutate: deleteProduct } = useDeleteProductMutation();
  const handleDeleteProduct = () => {
    deleteProduct(product.id);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`are you sure you want to delete ${product.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button variant="contained" onClick={handleDeleteProduct}>
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductDialog;
