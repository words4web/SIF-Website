export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CART: "/cart",
  PROFILE: "/profile",
  CATALOGUE: "/catalogue",
  CATALOGUE_CATEGORY: (category: string) => `/catalogue?category=${category}`,
  CHECKOUT: "/checkout",
  ORDERS: "/orders",
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  ORDER_SUCCESS: (id: string) => `/order-success/${id}`,
  NOTIFICATIONS: "/notifications",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  BLOGS: "/blogs",
  BLOG_DETAIL: (slug: string) => `/blogs/${slug}`,
};

export const PROTECTED_ROUTES = [
  ROUTES.PROFILE,
  ROUTES.ORDERS,
  ROUTES.CHECKOUT,
  ROUTES.NOTIFICATIONS,
  "/order-success",
];

export const GUEST_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];
