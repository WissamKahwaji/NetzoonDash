export type DeleteDepartmentCategoryDialogProps = {
  open: boolean;
  onClose: () => void;
  category: DepartmentCategory;
};
export type DepartmentCategory = {
  id: string;
  name: string;
};
