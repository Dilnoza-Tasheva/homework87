export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface Post {
  _id: string;
  title: string;
  description: string;
  image: string | null;
  author: User;
  createdAt: string;
  comments: Comment[];
}

export interface PostListResponse {
  posts: Post[];
  loading: boolean;
  error: string | null;
}


export interface PostMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface Comment {
  _id: string;
  text: string;
  author: User; // Уже существующий интерфейс User
  createdAt: string;
}