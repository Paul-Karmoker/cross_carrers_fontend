interface BaseQueryApi {
  signal: AbortSignal;
  abort: (reason?: string) => void;
  getState: () => unknown;
  extra: unknown;
  endpoint: string;
  type: "query" | "mutation";
  forced?: boolean;
  queryCacheKey?: string;
}
export type TError = {
  data: {
    message: string;
    stack: string;
    errorMessage: {
      path: string;
      message: string;
    };
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
  statusCode?: number;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
