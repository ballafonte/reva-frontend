export type QueryConfig<T, V = unknown> = {
  enabled?: boolean;
  gcTime?: number;
  queryKey?: string[];
  queryFn?: () => Promise<T>;
  onSuccess?: (data: T, params?: V) => void;
  onError?: (error: Error, params?: V) => void;
};
