import { TestType, Page } from "@playwright/test";

export type UserFixture = {
  user: {
    login: () => Promise<void>;
  };
};

export type TestArgs = {
  page: Page;
  user: UserFixture["user"];
};
