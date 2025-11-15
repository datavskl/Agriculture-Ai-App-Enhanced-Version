export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
};

export type TimeSeriesPoint = {
  timestamp: string;
  value: number;
};
