export interface Product {
  id: number | string;
  title: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutResponse {
  url: string;
}
