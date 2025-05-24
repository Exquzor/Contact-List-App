import { Subcategory } from "./subcategory";

// Category interface
export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
