import { config } from "@/config";
import { User } from "./auth.service";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface UpdateUserData {
  id: string;
  nombre?: string;
  correo?: string;
}

export const updateUser = async (
  data: UpdateUserData,
  token: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${config.BASE_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      return {
        success: false,
        message:
          responseData.message || `Error del servidor: ${response.status}`,
      };
    }

    return {
      success: true,
      message: "Usuario actualizado correctamente.",
      data: responseData.user,
    };
  } catch (error) {
    console.error("API Update User Error:", error);
    return {
      success: false,
      message: "No se pudo conectar al servidor.",
    };
  }
};

export const buscarUsuarios = async (
  query: string,
  token: string
): Promise<ApiResponse<User[]>> => {
  try {
    const res = await fetch(
      `${config.BASE_URL}/users/buscar?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json.message || "Error al buscar usuarios",
      };
    }

    return { success: true, data: json.usuarios || [] };
  } catch (error) {
    console.error("API buscarUsuarios Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};

export const getUsuarioById = async (
  id: string,
  token: string
): Promise<ApiResponse<User>> => {
  try {
    const res = await fetch(`${config.BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, message: json.message || `Error ${res.status}` };
    }

    return { success: true, data: json.user };
  } catch (error) {
    console.error("API getUsuarioById Error:", error);
    return { success: false, message: "No se pudo conectar al servidor." };
  }
};
