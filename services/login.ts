import { httpRequest } from "./http";
import { StatusCodes } from "http-status-codes";

export interface SignupRequest {
  user: {
    email: string;
    password: string;
    username: string;
  };
}

export interface SignupResponse {
  user: {
    username: string;
    email: string;
    bio: string;
    image: string;
    token: string;
  };
}

export interface LoginRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface LoginResponse {
  user: {
    username: string;
    email: string;
    bio: string;
    image: string;
    token: string;
  };
}

export async function signup(
  email: string,
  password: string,
  username: string,
): Promise<SignupResponse> {
  const payload: SignupRequest = {
    user: {
      email,
      password,
      username,
    },
  };

  const { data, status } = await httpRequest<SignupResponse>({
    method: "POST",
    resource: "/users",
    data: payload,
  });

  if (status !== StatusCodes.OK && status !== StatusCodes.CREATED) {
    throw new Error(`Failed to create user. Status code: ${status}`);
  }

  return data;
}

export async function userLogin(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const payload: LoginRequest = {
    user: {
      email,
      password,
    },
  };

  const { data, status } = await httpRequest<LoginResponse>({
    method: "POST",
    resource: "/users/login",
    data: payload,
  });

  if (status !== StatusCodes.OK) {
    throw new Error(`Failed to login user. Status code: ${status}`);
  }

  return data;
}
