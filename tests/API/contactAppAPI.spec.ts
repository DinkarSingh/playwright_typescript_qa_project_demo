import { test, expect, request } from "@playwright/test";
import { defaultData } from "../../data/default";

const { email, password } = defaultData.userCredentials[0];

let token: string;
let contactId: string;

test.describe("API Contact List Tests", () => {
  test("User Authentication via API", async ({ request }) => {
    const baseURL = test.info().project.use.baseURL;
    const loginUrl = `${baseURL}/users/login`;
    console.log("Hitting URL:", loginUrl);
    const response = await request.post(loginUrl, {
      data: { email, password },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.token).toBeDefined();
    token = body.token;
  });

  test("Create a Contact via API", async ({ request }) => {
    // Authenticate first
    if (!token) {
      const loginRes = await request.post(`/users/login`, {
        data: { email, password },
      });
      token = (await loginRes.json()).token;
    }
    const contactData = {
      firstName: "Test",
      lastName: "User",
      birthdate: "2000-01-01",
      email: "testuser@example.com",
      phone: "1234567890",
      street1: "123 Main St",
      city: "Testville",
      stateProvince: "TS",
      postalCode: "12345",
      country: "Testland",
    };
    const response = await request.post(`/contacts`, {
      data: contactData,
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body._id).toBeDefined();
    contactId = body._id;

    // Verify contact creation
    const getRes = await request.get(`/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const contacts = await getRes.json();
    expect(contacts.some((c: any) => c._id === contactId)).toBeTruthy();
  });

  test("Delete a Contact via API", async ({ request }) => {
    // Authenticate first
    if (!token) {
      const loginRes = await request.post(`/users/login`, {
        data: { email, password },
      });
      token = (await loginRes.json()).token;
    }
    // Create a contact if not present
    //contactId = '68e441a0a44fe70015f6ebd3'
    if (!contactId) {
      const contactData = {
        firstName: "Delete",
        lastName: "Me",
        birthdate: "1990-01-01",
        email: "deleteme@example.com",
        phone: "9876543210",
        street1: "456 Side St",
        city: "Deleteville",
        stateProvince: "DL",
        postalCode: "54321",
        country: "Deleteland",
      };
      const createRes = await request.post(`/contacts`, {
        data: contactData,
        headers: { Authorization: `Bearer ${token}` },
      });
      contactId = (await createRes.json())._id;
    }
    // Delete the contact
    const delRes = await request.delete(`/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(delRes.ok()).toBeTruthy();

    // Verify deletion
    const getRes = await request.get(`/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const contacts = await getRes.json();
    expect(contacts.some((c: any) => c._id === contactId)).toBeFalsy();
  });
});
