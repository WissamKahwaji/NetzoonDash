export type DeleteNewsDialogProps = {
  open: boolean;
  onClose: () => void;
  news: NewsProps;
};
export type NewsProps = {
  id: string;
  name: string;
};
