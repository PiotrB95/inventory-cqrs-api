export type DiscountContext = {
  baseTotal: number;
  totalQuantity: number;
  date: Date;
  customerLocation: 'US' | 'EU' | 'ASIA';
  productCategories: string[];
};

export type DiscountResult = {
  finalTotal: number;
  type: string | null;
};