export const CATEGORY = ["Top", "Dress", "Pants"] as const;
export type Category = (typeof CATEGORY)[number];

export const STATUS = ["active", "disactive"] as const;
export type ProductStatus = (typeof STATUS)[number];

export const SIZE = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof SIZE)[number];
