export type ResponseType<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type ArrayResponseType<T> = {
  data: T[];
  message: string;
  success: boolean;
  rowCount: number;
  page: number;
  pageSize: number;
};
