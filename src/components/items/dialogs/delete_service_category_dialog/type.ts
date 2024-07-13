export type DeleteServiceCategoryDialogProps = {
  open: boolean;
  onClose: () => void;
  category: ServiceCategory;
};
export type ServiceCategory = {
  id: string;
  title: string;
};
