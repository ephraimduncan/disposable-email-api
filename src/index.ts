import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { validator } from "hono/validator";
import { cors } from "hono/cors";

import { BlockList } from "./block-list";
import { AllowList } from "./allow-list";

const app = new Hono();
app.use("*", poweredBy());
app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => {
  return c.json({
    name: "is-disposable-email",
    version: "1.0.0",
  });
});

app.post(
  "/",
  validator("json", (value, c) => {
    if (!value.email) {
      return c.json({
        status: "error",
        message: "Email is required.",
      });
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(value.email)) {
      return c.json({
        status: "error",
        message: "Email is not valid.",
      });
    }

    return true;
  }),
  async (c) => {
    const { email }: { email: string } = await c.req.json();
    const isDisposableEmail = BlockList.has(email.split("@")[1]);
    const isAllowedList = AllowList.has(email.split("@")[1]);

    return c.json({
      email: email,
      isDisposable: isDisposableEmail,
      isAllowedList: isAllowedList,
      status: "success",
      message: isDisposableEmail
        ? "Email is from a disposable email service"
        : "Email is not from a disposable email service.",
      timestamp: new Date().toISOString(),
    });
  }
);

export default app;
