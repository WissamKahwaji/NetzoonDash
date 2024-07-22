export type DeleteDealDialogProps = {
  open: boolean;
  onClose: () => void;
  deal: DealProps;
};
export type DealProps = {
  id: string;
  name: string;
};
