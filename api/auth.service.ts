import { config } from "@/config";

export enum Rol {
  INQUILINO = "inquilino",
  PROPIETARIO = "propietario",
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: Rol;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  nombre: string;
  rol: Rol;
  correo: string;
}

export interface UserAuth {
  id: string;
  rol: Rol;
  nombre: string;
  correo: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserAuth;
}

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${config.BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: data.name,
        correo: data.email,
        rol: data.role,
        contraseña: data.password,
      }),
    });

    const responseData: AuthResponse = await response.json();

    if (!response.ok || !responseData.success) {
      return {
        success: false,
        message:
          responseData.message || `Error del servidor: ${response.status}`,
      };
    }

    return {
      success: true,
      message: "Registro exitoso",
      token: responseData.token,
      user: responseData.user,
    };
  } catch (error) {
    console.error("API Register Error:", error);
    return {
      success: false,
      message: "No se pudo conectar al servidor.",
    };
  }
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${config.BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correo: data.email,
        contraseña: data.password,
      }),
    });

    const responseData: AuthResponse = await response.json();

    if (!responseData) {
      return {
        success: false,
        message: "Credenciales inválidas o error de servidor.",
      };
    }

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      token: responseData.token,
      user: responseData.user,
    };
  } catch (error) {
    console.error("API Login Error:", error);
    return {
      success: false,
      message: "No se pudo conectar al servidor. Verifique su conexión de red.",
    };
  }
};
