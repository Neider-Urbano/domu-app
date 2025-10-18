import { config } from "@/config";
import { User } from "./auth.service";

type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type TipoPropiedad = "casa" | "departamento" | "otro";
export type EstadoPropiedad = "ocupada" | "disponible" | "mantenimiento";

export interface Propiedad {
  _id: string;
  nombre: string;
  fotos: string[];
  direccion: string;
  precioBase: number;
  tipo: TipoPropiedad;
  caracteristicas: string;
  estado: EstadoPropiedad;
  propietario: User;
  idPropietario: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreatePropiedadData = {
  nombre: string;
  direccion: string;
  precioBase: number;
  tipo: TipoPropiedad;
  caracteristicas?: string;
  fotos?: string[];
};

export type UpdatePropiedadData = Partial<CreatePropiedadData>;

export const listPropiedades = async (): Promise<ApiResponse<Propiedad[]>> => {
  try {
    const res = await fetch(`${config.BASE_URL}/propiedades/`);
    const json = await res.json();
    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, data: json.propiedades };
  } catch (error) {
    console.error("API listPropiedades Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const getPropiedad = async (
  id: string
): Promise<ApiResponse<Propiedad>> => {
  try {
    const res = await fetch(`${config.BASE_URL}/propiedades/${id}`);

    const json = await res.json();

    if (!res.ok || !json) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, data: json.propiedad };
  } catch (error) {
    console.error("API getPropiedad Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const createPropiedad = async (
  data: CreatePropiedadData,
  token: string
): Promise<ApiResponse<Propiedad>> => {
  try {
    const res = await fetch(`${config.BASE_URL}/propiedades/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, data: json.propiedad };
  } catch (error) {
    console.error("API createPropiedad Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const updatePropiedad = async (
  id: string,
  data: UpdatePropiedadData,
  token: string
): Promise<ApiResponse<Propiedad>> => {
  try {
    const res = await fetch(`${config.BASE_URL}/propiedades/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, data: json.propiedad };
  } catch (error) {
    console.error("API updatePropiedad Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const deletePropiedad = async (
  id: string,
  token: string
): Promise<ApiResponse> => {
  try {
    const res = await fetch(`${config.BASE_URL}/propiedades/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }
    return { success: true, message: json.message || "Eliminada" };
  } catch (error) {
    console.error("API deletePropiedad Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const listMyProperties = async (
  token: string
): Promise<ApiResponse<Propiedad[]>> => {
  try {
    const res = await fetch(`${config.BASE_URL}/propiedades/mine`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, data: json.propiedades };
  } catch (error) {
    console.error("API listMyProperties Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const buscarPropiedadesDisponibles = async (
  query: string,
  token: string
): Promise<ApiResponse<Propiedad[]>> => {
  try {
    const res = await fetch(
      `${config.BASE_URL}/propiedades/buscar?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();

    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, data: json.propiedades };
  } catch (error) {
    console.error("API buscarPropiedadesDisponibles Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};
