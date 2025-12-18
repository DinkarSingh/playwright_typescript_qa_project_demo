import { test, expect } from "@playwright/test";
import { defaultData } from "../../data/default";

const { email, password } = defaultData.userCredentials[0];

const baseURL = defaultData.apibaseURL[0].baseURL;

test.describe("API Tests - Login Verification", () => {
  test("POST /api/verifyLogin - should verify login with valid details", async ({
    request,
  }) => {
    const response = await request.post(`${baseURL}/api/verifyLogin`, {
      form: {
        email,
        password,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("responseCode");
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toBe("User exists!");

    console.log(`Response Code: ${responseBody.responseCode}`);
    console.log(`Response Message: ${responseBody.message}`);
    console.log(`Login verification successful for email: ${email}`);
  });
});
