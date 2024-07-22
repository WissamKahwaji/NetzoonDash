export type ComplaintModel = {
  _id?: string;
  address: string;
  text: string;
  reply?: string;
  createdAt?: string;
};

export type ComplaintInputModel = {
  _id?: string;
  reply?: string;
};
