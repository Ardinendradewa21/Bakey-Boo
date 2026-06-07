// ============================================================
// Core Entity Types for Bakey Boo — Bakery Store
// ============================================================

export type UserRole = "buyer" | "admin";

export type OrderStatus = "pending" | "completed" | "failed" | "cancelled";

export type ProductCategory = "roti" | "donat";

export type DeliveryMethod = "delivery" | "pickup";

export type DiscountType = "percentage" | "fixed";

// ============================================================
// Database Row Types (matches InsForge table schemas)
// ============================================================

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  original_price?: number | null;
  is_bundle?: boolean;
  category: ProductCategory;
  is_published: boolean;
  view_count: number;
  stock: number | null; // null = unlimited
  delivery_method: DeliveryMethod;
  flavors?: string[]; // e.g. ["Coklat", "Keju", "Strawberry"]
  sizes?: string[]; // e.g. ["Mini", "Reguler", "Jumbo"]
  created_at: string;
  updated_at: string;
  // Joined fields
  images?: ProductImage[];
  files?: ProductFile[];
  tags?: ProductTag[];
  reviews?: Review[];
  rating_avg?: number;
  review_count?: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  storage_key: string | null;
  sort_order: number;
}

export interface BundleItem {
  id: string;
  bundle_id: string;
  product_id: string;
  created_at: string;
  product?: Product; // Relation for populated data
}

export interface ProductFile {
  id: string;
  product_id: string;
  file_url: string;
  storage_key: string | null;
  file_name: string;
  file_type: string;
  file_size: number; // bytes
}

export interface ProductTag {
  id: string;
  product_id: string;
  tag_name: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  total_price: number;
  status: OrderStatus;
  promo_code_id: string | null;
  discount_amount: number;
  recipient_name?: string | null;
  phone?: string | null;
  address?: string | null;
  delivery_method?: string | null;
  created_at: string;
  // Joined
  items?: OrderItem[];
  payment?: Payment;
  buyer?: UserProfile;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  price: number;
  selected_flavor?: string;
  selected_size?: string;
  // Joined
  product?: Product;
}

export interface Payment {
  id: string;
  order_id: string;
  payment_method: string | null;
  transaction_id: string | null;
  snap_token: string | null;
  status: string;
  midtrans_response: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  buyer_id: string;
  rating: number; // 1-5
  comment: string | null;
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
  // Joined
  buyer?: UserProfile;
}

export interface Wishlist {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  // Joined
  product?: Product;
}

export interface PromoCode {
  id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  min_purchase: number;
  max_usage: number;
  usage_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

// ============================================================
// API Response Types
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================
// Auth Types
// ============================================================

export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  profile?: UserProfile;
}

// ============================================================
// Filter & Search Types
// ============================================================

export interface ProductFilters {
  category?: ProductCategory;
  search?: string;
  page?: number;
  limit?: number;
}

// ============================================================
// Cart Types
// ============================================================

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor?: string;
  selectedSize?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedFlavor?: string, selectedSize?: string) => boolean;
  removeItem: (productId: string, selectedFlavor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedFlavor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}
