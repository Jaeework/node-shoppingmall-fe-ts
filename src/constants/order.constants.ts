export const ORDER_STATUS = ["preparing", "shipping", "delivered", "refund"] as const;
export type OrderStatus = (typeof ORDER_STATUS)[number];

export const badgeBg: Record<string, string> = {
  preparing: "bg-blue-100 text-blue-800",
  shipping: "bg-yellow-100 text-yellow-800",
  refund: "bg-red-100 text-red-800",
  delivered: "bg-green-100 text-green-800",
};
