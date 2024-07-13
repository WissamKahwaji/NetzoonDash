export type DeleteAdsDialogProps = {
  open: boolean;
  onClose: () => void;
  ads: AdsProps;
};
export type AdsProps = {
  id: string;
  name: string;
};
