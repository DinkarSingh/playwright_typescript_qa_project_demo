import { test as base, request } from "@playwright/test";
import { defaultData } from "../data/default";

export const storageStatePath = "auth/storageState.json";

const { email, password } = defaultData.userCredentials[0];

const test = base.extend<{ user: { login: () => Promise<void> } }>({
  user: async ({}, use) => {
    const login = async () => {
      const apiRequest = await request.newContext();
      const baseURL = base.info().project.use.baseURL;
      const loginUrl = `${baseURL}/users/login`;
      const response = await apiRequest.post(loginUrl, {
        data: { email, password },
      });
      const body = await response.json();
      if (!body.token) throw new Error("Login failed, no token returned");
      await apiRequest.storageState({ path: storageStatePath });
      await apiRequest.dispose();
    };
    await use({ login });
  },
});

export { test };
