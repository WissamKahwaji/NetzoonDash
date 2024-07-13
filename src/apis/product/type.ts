export type ProductModel = {
  _id?: string;
  owner: string;
  name: string;
  imageUrl?: string;
  category?: string;
  condition?: "new" | "used"; // Optional with specific values
  description: string;
  price: number;
  quantity?: number; // Optional with default value
  weight?: number; // Optional
  images?: string[]; // Optional array of strings
  vedioUrl?: string; // Optional
  gifUrl?: string; // Optional
  guarantee?: boolean; // Optional boolean
  address?: string; // Optional
  madeIn?: string; // Optional
  year?: Date; // Optional Date type
  discountPercentage?: number; // Optional
  priceAfterDiscount?: number; // Optional
  color?: string; // Optional
  country: string;
  ratings?: {
    user: string;
    rating: number;
  }[];
  totalRatings?: number; // Optional with default value
  averageRating?: number; // Optional with default value
  productimages?: File[] | null;
};
