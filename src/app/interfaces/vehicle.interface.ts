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
  plate: string;
  model: string;
  setting_id: number;
  bodywork_id: number;
  user_id: number;
  picture: string;
}

