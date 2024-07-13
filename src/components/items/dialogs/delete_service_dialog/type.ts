export type DeleteServiceDialogProps = {
  open: boolean;
  onClose: () => void;
  service: ServiceProps;
};
export type ServiceProps = {
  id: string;
  name: string;
};
