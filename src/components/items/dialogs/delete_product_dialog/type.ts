export type DeleteProductDialogProps = {
  open: boolean;
  onClose: () => void;
  product: ProductProps;
};
export type ProductProps = {
  id: string;
  name: string;
};
