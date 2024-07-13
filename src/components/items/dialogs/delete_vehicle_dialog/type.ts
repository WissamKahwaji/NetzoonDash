export type DeleteVehicleDialogProps = {
  open: boolean;
  onClose: () => void;
  vehicle: VehicleProps;
};
export type VehicleProps = {
  id: string;
  name: string;
};
