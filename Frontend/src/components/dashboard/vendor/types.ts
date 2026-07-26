export interface UserInfo {
  fullName: string;
  email: string;
  location: string;
}

export interface Vendor {
  id: string;
  name: string;
  verified: boolean;
  desc: string;
  rating: number;
  reviews: number;
  distance: number;
  image: string;
  saved: boolean;
}

export interface Quotation {
  id: string;
  vendor: string;
  systemSize: string;
  estimatedCost: string;
  status: string;
  date: string;
  savings: string;
}

export interface NotificationItem {
  id: number;
  type: string;
  text: string;
  time: string;
  active: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}
