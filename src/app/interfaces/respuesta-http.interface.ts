export interface RespuestaHttpInterface<T> {
  data: T;
  fechaActual: string;
  httpResponseCode: number;
  message: string;
  success: boolean;
  error?: string;
}
