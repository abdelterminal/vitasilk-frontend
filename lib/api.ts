/**
 * Central API client — all calls to the Express backend go through here.
 * Base URL is read from NEXT_PUBLIC_API_URL env var.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ─── Token helpers ────────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('vs_token');
}

export function setToken(token: string) {
  localStorage.setItem('vs_token', token);
}

export function removeToken() {
  localStorage.removeItem('vs_token');
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = false
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const json = await res.json();

  if (!res.ok) {
    throw Object.assign(new Error(json.message || 'Request failed'), {
      status: res.status,
      errors: json.errors,
    });
  }

  return json;
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    request<{ success: boolean; data: { user: User; token: string } }>(
      '/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }
    ),

  register: (name: string, email: string, password: string) =>
    request<{ success: boolean; data: { user: User; token: string } }>(
      '/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }
    ),

  me: () =>
    request<{ success: boolean; data: User }>('/auth/me', {}, true),
};

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export const productsApi = {
  getAll: (params: Record<string, string | number | boolean> = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => [k, String(v)])
    ).toString();
    return request<PaginatedResponse<Product>>(`/products${qs ? `?${qs}` : ''}`);
  },

  getById: (id: number | string) =>
    request<{ success: boolean; data: Product }>(`/products/${id}`),

  create: (data: Partial<Product>) =>
    request<{ success: boolean; data: Product }>('/products', {
      method: 'POST', body: JSON.stringify(data),
    }, true),

  update: (id: number | string, data: Partial<Product>) =>
    request<{ success: boolean; data: Product }>(`/products/${id}`, {
      method: 'PUT', body: JSON.stringify(data),
    }, true),

  delete: (id: number | string) =>
    request<{ success: boolean }>(`/products/${id}`, { method: 'DELETE' }, true),
};

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

export const categoriesApi = {
  getAll: () =>
    request<{ success: boolean; data: Category[] }>('/categories'),

  getById: (id: number | string) =>
    request<{ success: boolean; data: Category }>(`/categories/${id}`),

  create: (data: { name: string; image?: string }) =>
    request<{ success: boolean; data: Category }>('/categories', {
      method: 'POST', body: JSON.stringify(data),
    }, true),

  update: (id: number | string, data: Partial<Category>) =>
    request<{ success: boolean; data: Category }>(`/categories/${id}`, {
      method: 'PUT', body: JSON.stringify(data),
    }, true),

  delete: (id: number | string) =>
    request<{ success: boolean }>(`/categories/${id}`, { method: 'DELETE' }, true),
};

// ─── ORDERS ───────────────────────────────────────────────────────────────────

export const ordersApi = {
  create: (data: CreateOrderPayload) =>
    request<{ success: boolean; data: Order }>('/orders', {
      method: 'POST', body: JSON.stringify(data),
    }, true),

  getMyOrders: (page = 1, limit = 10) =>
    request<PaginatedResponse<Order>>(`/orders/my?page=${page}&limit=${limit}`, {}, true),

  getById: (id: number | string) =>
    request<{ success: boolean; data: Order }>(`/orders/${id}`, {}, true),

  getAll: (params: { page?: number; limit?: number; status?: string } = {}) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([,v]) => v !== undefined).map(([k,v]) => [k, String(v)])).toString();
    return request<PaginatedResponse<Order>>(`/orders${qs ? `?${qs}` : ''}`, {}, true);
  },

  updateStatus: (id: number | string, status: string) =>
    request<{ success: boolean; data: Order }>(`/orders/${id}/status`, {
      method: 'PATCH', body: JSON.stringify({ status }),
    }, true),

  delete: (id: number | string) =>
    request<{ success: boolean }>(`/orders/${id}`, { method: 'DELETE' }, true),

  track: (id: string, phone: string) =>
    request<{ success: boolean; data: Order }>(
      `/orders/track?id=${encodeURIComponent(id)}&phone=${encodeURIComponent(phone)}`
    ),
};

// ─── REVIEWS ──────────────────────────────────────────────────────────────────

export const reviewsApi = {
  getByProduct: (productId: number | string, page = 1) =>
    request<PaginatedResponse<Review> & { averageRating: string | null }>(
      `/products/${productId}/reviews?page=${page}`
    ),

  create: (productId: number | string, data: { rating: number; comment?: string; user_name?: string }) =>
    request<{ success: boolean; data: Review }>(`/products/${productId}/reviews`, {
      method: 'POST', body: JSON.stringify(data),
    }, false),

  delete: (reviewId: number | string) =>
    request<{ success: boolean }>(`/reviews/${reviewId}`, { method: 'DELETE' }, true),

  getAll: (page = 1, limit = 50) =>
    request<{ success: boolean; data: (Review & { product_name?: string; product_images?: string })[]; pagination: { page: number; limit: number; total: number } }>(
      `/admin/reviews?page=${page}&limit=${limit}`, {}, true
    ),
};

// ─── USERS ────────────────────────────────────────────────────────────────────

export const usersApi = {
  getAll: (page = 1, limit = 20) =>
    request<PaginatedResponse<User>>(`/users?page=${page}&limit=${limit}`, {}, true),

  updateMe: (data: { name?: string; password?: string; photo_url?: string; phone?: string; address?: any }) =>
    request<{ success: boolean; data: User }>('/users/me', {
      method: 'PUT', body: JSON.stringify(data),
    }, true),

  delete: (id: number | string) =>
    request<{ success: boolean }>(`/users/${id}`, { method: 'DELETE' }, true),

  getWishlist: () =>
    request<{ success: boolean; data: Product[] }>('/users/me/wishlist', {}, true),

  addToWishlist: (productId: number | string) =>
    request<{ success: boolean }>(`/users/me/wishlist/${productId}`, { method: 'POST' }, true),

  removeFromWishlist: (productId: number | string) =>
    request<{ success: boolean }>(`/users/me/wishlist/${productId}`, { method: 'DELETE' }, true),
};

// ─── MESSAGES ─────────────────────────────────────────────────────────────────

export const messagesApi = {
  send: (data: { name: string; email: string; subject?: string; message: string }) =>
    request<{ success: boolean }>('/messages', { method: 'POST', body: JSON.stringify(data) }),

  getAll: (page = 1) =>
    request<PaginatedResponse<Message>>(`/messages?page=${page}`, {}, true),

  markRead: (id: number | string) =>
    request<{ success: boolean }>(`/messages/${id}/read`, { method: 'PATCH' }, true),

  delete: (id: number | string) =>
    request<{ success: boolean }>(`/messages/${id}`, { method: 'DELETE' }, true),
};

// ─── SUBSCRIBERS ──────────────────────────────────────────────────────────────

export const subscribersApi = {
  subscribe: (email: string) =>
    request<{ success: boolean }>('/subscribers', { method: 'POST', body: JSON.stringify({ email }) }),

  getAll: (page = 1) =>
    request<PaginatedResponse<Subscriber>>(`/subscribers?page=${page}`, {}, true),

  delete: (id: number | string) =>
    request<{ success: boolean }>(`/subscribers/${id}`, { method: 'DELETE' }, true),
};

// ─── EVENTS ───────────────────────────────────────────────────────────────────

export const eventsApi = {
  getActive: () =>
    request<{ success: boolean; data: Event | null }>('/events/active'),

  getAll: () =>
    request<{ success: boolean; data: Event[] }>('/events', {}, true),

  create: (data: Partial<Event>) =>
    request<{ success: boolean; data: Event }>('/events', {
      method: 'POST', body: JSON.stringify(data),
    }, true),

  update: (id: number | string, data: Partial<Event>) =>
    request<{ success: boolean; data: Event }>(`/events/${id}`, {
      method: 'PUT', body: JSON.stringify(data),
    }, true),

  delete: (id: number | string) =>
    request<{ success: boolean }>(`/events/${id}`, { method: 'DELETE' }, true),

  recordDiscount: (event_id: number, percentage: number) =>
    request<{ success: boolean }>('/events/discounts', {
      method: 'POST', body: JSON.stringify({ event_id, percentage }),
    }, true),

  getMyDiscounts: () =>
    request<{ success: boolean; data: UserDiscount[] }>('/events/discounts/mine', {}, true),
};

// ─── PROMOTIONS ───────────────────────────────────────────────────────────────

export const promotionsApi = {
  validate: (code: string) =>
    request<{ success: boolean; data: { discount_percentage: number } }>('/promotions/validate', {
      method: 'POST', body: JSON.stringify({ code }),
    }),

  getAll: () =>
    request<{ success: boolean; data: Promotion[] }>('/promotions', {}, true),

  create: (data: { code: string; discount_percentage: number; max_uses?: number; expires_at?: string }) =>
    request<{ success: boolean; data: Promotion }>('/promotions', {
      method: 'POST', body: JSON.stringify(data),
    }, true),

  delete: (id: number | string) =>
    request<{ success: boolean }>(`/promotions/${id}`, { method: 'DELETE' }, true),
};

// ─── CHAT ─────────────────────────────────────────────────────────────────────

export const chatApi = {
  // Admin: no user_id = returns sessions list; with user_id = returns messages for that user
  getSessions: () =>
    request<{ success: boolean; data: ChatSession[] }>('/chat', {}, true),

  getMyMessages: (limit = 100) =>
    request<{ success: boolean; data: ChatMessage[] }>(`/chat/my?limit=${limit}`, {}, true),

  getMessages: (user_id: number, limit = 100) =>
    request<{ success: boolean; data: ChatMessage[] }>(`/chat?user_id=${user_id}&limit=${limit}`, {}, true),

  send: (message: string, user_name?: string) =>
    request<{ success: boolean; data: ChatMessage }>('/chat', {
      method: 'POST', body: JSON.stringify({ message, user_name }),
    }, true),

  reply: (message: string, target_user_id: number) =>
    request<{ success: boolean; data: ChatMessage }>('/chat/reply', {
      method: 'POST', body: JSON.stringify({ message, target_user_id }),
    }, true),
};

// ─── UPLOADS ──────────────────────────────────────────────────────────────────

export const uploadsApi = {
  uploadSingle: async (file: File): Promise<string> => {
    const token = getToken();
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${BASE_URL}/uploads/single`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Upload failed');
    return `${BASE_URL}${json.data.url}`;
  },

  uploadMultiple: async (files: File[]): Promise<string[]> => {
    const token = getToken();
    const form = new FormData();
    files.forEach(f => form.append('files', f));
    const res = await fetch(`${BASE_URL}/uploads/multiple`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Upload failed');
    return json.data.map((f: { url: string }) => `${BASE_URL}${f.url}`);
  },

  delete: (filename: string) =>
    request<{ success: boolean }>(`/uploads/${filename}`, { method: 'DELETE' }, true),
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────

export const adminApi = {
  getStats: () =>
    request<{ success: boolean; data: AdminStats }>('/admin/stats', {}, true),

  getLogs: (page = 1) =>
    request<PaginatedResponse<AdminLog>>(`/admin/logs?page=${page}`, {}, true),

  getSetting: <T = unknown>(key: string) =>
    request<{ success: boolean; data: T }>(`/admin/settings/${key}`, {}, true),

  setSetting: <T = unknown>(key: string, value: T) =>
    request<{ success: boolean; data: T }>(`/admin/settings/${key}`, {
      method: 'PUT', body: JSON.stringify(value),
    }, true),
};

// ─── Image URL helper ─────────────────────────────────────────────────────────
// Converts relative /uploads/... paths to full URLs for display
export function imageUrl(path: string | null | undefined): string {
  if (!path) return '/placeholder.png';
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/')) return path;
  return `${BASE_URL}${path}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  photo_url?: string;
  created_at?: string;
  address?: string | { street: string; city: string; region: string; zip: string };
  phone?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  price_eur?: number;
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  stock: number;
  featured: boolean;
  direct_checkout: boolean;
  enable_cart: boolean;
  images: string[];
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  created_at?: string;
}

export interface Order {
  id: number;
  user_id?: number;
  user_name?: string;
  user_email?: string;
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address?: string;
  phone?: string;
  city?: string;
  payment_method: 'cash' | 'bank_transfer';
  notes?: string;
  discount_percentage: number;
  items: OrderItem[];
  created_at?: string;
}

export interface OrderItem {
  id: number;
  product_id?: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  items: { product_id: number; quantity: number }[];
  address: string;
  phone: string;
  city?: string;
  payment_method?: 'cash' | 'bank_transfer';
  notes?: string;
  discount_percentage?: number;
}

export interface Review {
  id: number;
  product_id: number;
  user_id?: number;
  user_name: string;
  rating: number;
  comment?: string;
  created_at?: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at?: string;
}

export interface Subscriber {
  id: number;
  email: string;
  created_at?: string;
}

export interface Event {
  id: number;
  title: string;
  banner_url?: string;
  percentages: number[];
  is_active: boolean;
  created_at?: string;
}

export interface UserDiscount {
  id: number;
  event_id?: number;
  event_name?: string;
  percentage: number;
  won_at?: string;
}

export interface Promotion {
  id: number;
  code: string;
  discount_percentage: number;
  is_active: boolean;
  usage_count: number;
  max_uses?: number;
  expires_at?: string;
  created_at?: string;
}

export interface ChatMessage {
  id: number;
  user_id?: number;
  user_name: string;
  message: string;
  sender?: 'client' | 'admin';
  timestamp?: string;
}

export interface ChatSession {
  user_id: number;
  user_name: string;
  last_timestamp: string;
  last_message: string;
  unread_count: number;
}

export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  lowStock: number;
  pendingOrders: number;
  unreadMessages: number;
  recentOrders: Partial<Order>[];
}

export interface AdminLog {
  id: number;
  admin_id?: number;
  admin_name?: string;
  action: string;
  details?: string;
  created_at?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
