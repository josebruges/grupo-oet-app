export interface Configuracion {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Carroceria {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Listoption {
  configuracion: Configuracion[];
  carroceria: Carroceria[];
}
export interface Vehicle {
  id?: number;
  plate?: string;
  model?: string;
  picture?: string;
  setting_id?: number;
  bodywork_id?: number;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  setting?: {
    id?: number;
    name?: string;
    created_at?: string | null;
    updated_at?: string | null;
  };
  bodywork?: {
    id?: number;
    name?: string;
    created_at?: string | null;
    updated_at?: string | null;
  };
}
export interface VehicleData {
  data: Vehicle[]
}


