export type Author = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: Author;
};

export type ArticleParams = {
  limit: number;
  page: number;
};

export type ArticleResponse = {
  data: Article[];
  total: number;
  page: number;
  lastPage: number;
};
