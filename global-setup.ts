import { request } from "@playwright/test";
import { defaultData } from "./data/default";

export default async function globalSetup() {
  const apiRequest = await request.newContext();
  const baseURL = defaultData.uibaseURL[0].baseURL;
  const loginUrl = `${baseURL}/users/login`;
  const response = await apiRequest.post(loginUrl, {
    data: {
      email: defaultData.userCredentials[0].email,
      password: defaultData.userCredentials[0].password,
    },
  });
  const body = await response.json();
  if (!body.token) throw new Error("Login failed, no token returned");
  await apiRequest.storageState({ path: "auth/storageState.json" });
  await apiRequest.dispose();
}
