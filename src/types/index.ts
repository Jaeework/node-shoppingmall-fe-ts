// ─── Domain Models ───────────────────────────────────────────────────────────

export interface User {
  _id: string;
  email: string;
  name: string;
  level: "customer" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  sku: string;
  name: string;
  image: string;
  category: string[];
  description: string;
  price: number;
  stock: Record<string, number>;
  status: "active" | "disactive";
  isDeleted?: boolean;
  createdAt?: string;
}

export interface CartItem {
  _id: string;
  productId: Product;
  size: string;
  price: number;
  qty: number;
}

export interface OrderItem {
  _id: string;
  productId: Product;
  size: string;
  price: number;
  qty: number;
}

export interface ShipTo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
}

export interface Contact {
  firstName: string;
  lastName: string;
  contact: string;
}

export interface Order {
  _id: string;
  shipTo: ShipTo;
  contact: Contact;
  totalPrice: number;
  userId: User;
  status: "preparing" | "shipping" | "delivered" | "refund";
  items: OrderItem[];
  orderNum: string;
  createdAt: string;
  updatedAt?: string;
}

// ─── Redux State Types ────────────────────────────────────────────────────────

export interface UserState {
  user: User | null;
  loading: boolean;
  loginError: string | null;
  registrationError: string | null;
  success: boolean;
}

export interface ProductState {
  productList: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string;
  totalPageNum: number;
  success: boolean;
  filteredList?: Product[];
}

export interface CartState {
  loading: boolean;
  error: string;
  cartList: CartItem[];
  selectedItem: CartItem | Record<string, never>;
  cartItemCount: number;
  totalPrice: number;
}

export interface OrderState {
  orderList: Order[];
  orderNum: string;
  selectedOrder: Order | Record<string, never>;
  error: string;
  loading: boolean;
  totalPageNum: number;
}

export interface ToastMessagePayload {
  message: string;
  status: string;
}

export interface UIState {
  toastMessage: ToastMessagePayload;
}

// ─── UI / Form Types ──────────────────────────────────────────────────────────

export interface CardValue {
  cvc: string;
  expiry: string;
  focus: string;
  name: string;
  number: string;
}

export interface SearchQuery {
  page: number;
  name?: string;
  ordernum?: string;
}
