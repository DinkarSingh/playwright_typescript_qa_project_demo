import axios, { AxiosInstance, AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";
import { defaultData } from "../data/default";

function getHttpInstance(token?: string): AxiosInstance {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add Authorization header if token is provided
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const instance = axios.create({
    baseURL: defaultData.publicAPIbaseURL[0].baseURL,
    headers,
  });
  return instance;
}

export async function httpRequest<T>({
  method,
  resource,
  data,
  auth,
  token,
  validateStatus = (status) =>
    status >= StatusCodes.OK && status < StatusCodes.MULTIPLE_CHOICES,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  resource: string;
  data?: any;
  auth?: { email: string; password: string };
  token?: string;
  validateStatus?: (status: number) => boolean;
}): Promise<AxiosResponse<T, unknown>> {
  const response = await getHttpInstance(token).request<T>({
    method,
    url: resource,
    data,
    auth: auth
      ? {
          username: auth.email,
          password: auth.password,
        }
      : undefined,
    validateStatus,
  });
  return response;
}
