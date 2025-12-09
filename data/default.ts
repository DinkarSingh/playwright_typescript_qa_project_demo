import dotenv from "dotenv";
dotenv.config();

export const defaultData = {
  apibaseURL: [
    {
      baseURL: "https://thinking-tester-contact-list.herokuapp.com",
    },
  ],
  uibaseURL: [
    {
      baseURL: "https://thinking-tester-contact-list.herokuapp.com",
    },
  ],
  userCredentials: [
    {
      email: process.env.USER_EMAIL || "",
      password: process.env.USER_PASSWORD || "",
    },
  ],
};
