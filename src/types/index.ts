export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  bio?: string;
  banned?: boolean;
  createdAt?: string;
}

export interface Image {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  cloudinaryId: string;
  tags: string[];
  user: User;
  likes: string[] | User[];
  flagged: boolean;
  flagReasons: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  _id: string;
  name: string;
  description?: string;
  user: User;
  images: Image[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  user: User;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
