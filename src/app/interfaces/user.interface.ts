export interface UserInterface {
  token?: string;
  nombres?: string;
  apellidos?: string;
  cedula?: string;
  correo?: string;
  telefono?: string;
  password?: string;
  address?: string;
  cedula_front?: string | null;
  cedula_later?: string | null;
  id?: number;
  code?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  iat?: number;
  exp?: number;
}
export interface VerifyCodeUserInterface {
    correo: string;
    code: string;
}
export interface UserCurrentInterface {
  token?: string;
  id: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  correo: string;
  telefono: string;
  cedula_front: string | null;
  cedula_later: string | null;
  address: string;
  code: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  iat: number;
  exp: number;
}
export interface UserVerifyCodeResponseInterface {
  status: number;
  verificado: string;
}
export interface Position {
  /**
   * Creation timestamp for coords
   *
   * @since 1.0.0
   */
  timestamp: number;
  /**
   * The GPS coordinates along with the accuracy of the data
   *
   * @since 1.0.0
   */
  coords: {
      /**
       * Latitude in decimal degrees
       *
       * @since 1.0.0
       */
      latitude: number;
      /**
       * longitude in decimal degrees
       *
       * @since 1.0.0
       */
      longitude: number;
      /**
       * Accuracy level of the latitude and longitude coordinates in meters
       *
       * @since 1.0.0
       */
      accuracy: number;
      /**
       * Accuracy level of the altitude coordinate in meters, if available.
       *
       * Available on all iOS versions and on Android 8.0+.
       *
       * @since 1.0.0
       */
      altitudeAccuracy: number | null | undefined;
      /**
       * The altitude the user is at (if available)
       *
       * @since 1.0.0
       */
      altitude: number | null;
      /**
       * The speed the user is traveling (if available)
       *
       * @since 1.0.0
       */
      speed: number | null;
      /**
       * The heading the user is facing (if available)
       *
       * @since 1.0.0
       */
      heading: number | null;
  };
}
