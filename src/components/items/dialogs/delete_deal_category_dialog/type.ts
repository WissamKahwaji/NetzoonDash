export type DeleteDealCategoryDialogProps = {
  open: boolean;
  onClose: () => void;
  category: DealCategory;
};
export type DealCategory = {
  id: string;
  title: string;
};
