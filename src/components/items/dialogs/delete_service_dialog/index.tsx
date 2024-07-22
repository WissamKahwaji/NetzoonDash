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
import { useDeleteServiceMutation } from "../../../../apis/services/queries";
import { DeleteServiceDialogProps } from "./type";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const DeleteServiceDialog = ({
  open,
  onClose,
  service,
}: DeleteServiceDialogProps) => {
  const { t } = useTranslation();
  const { mutate: deleteService } = useDeleteServiceMutation();
  const handleDeleteService = () => {
    deleteService(service.id);
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <DialogContentText>{`${t("are_you_sure_you_want_to_delete")} ${
          service.name
        }`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button variant="contained" onClick={handleDeleteService}>
          {t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteServiceDialog;
