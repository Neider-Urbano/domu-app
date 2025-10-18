import { config } from "@/config";
import { User } from "./auth.service";
import { Propiedad } from "./propiedad.service";

export interface Contrato {
  _id: string;
  fechaInicio: string;
  fechaFin: string;
  duracion: string;
  condiciones?: string;
  idPropietario: string;
  idInquilino: User;
  idPropiedad: Propiedad;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContratoData {
  fechaInicio: string;
  fechaFin: string;
  duracion: number;
  condiciones?: string;
  idInquilino: string;
  idPropiedad: string;
}

type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

export const createContrato = async (
  data: CreateContratoData,
  token: string
): Promise<ApiResponse<Contrato>> => {
  try {
    const res = await fetch(`${config.BASE_URL}/contratos`, {
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

    return { success: true, data: json.contrato };
  } catch (error) {
    console.error("API createContrato Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const listContratos = async (
  token: string
): Promise<ApiResponse<Contrato[]>> => {
  try {
    const res = await fetch(`${config.BASE_URL}/contratos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, data: json.contratos };
  } catch (error) {
    console.error("API listContratos Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const getContrato = async (
  id: string,
  token: string
): Promise<ApiResponse<Contrato>> => {
  try {
    const res = await fetch(`${config.BASE_URL}/contratos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, data: json.contrato };
  } catch (error) {
    console.error("API getContrato Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const cancelContrato = async (
  id: string,
  token: string
): Promise<ApiResponse> => {
  try {
    const res = await fetch(`${config.BASE_URL}/contratos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, message: json.message || "Contrato cancelado" };
  } catch (error) {
    console.error("API cancelContrato Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};
