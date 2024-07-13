export type DeleteUserDialogProps = {
  open: boolean;
  onClose: () => void;
  user: User;
};
export type User = {
  id: string;
  name: string;
};
