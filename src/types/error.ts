export type ApiError = {
  statusCode: number;
  error: string;
  message: string;
  details?: {
    errors?: string[];
  };
};
