// @ts-ignore
import { list } from "../src/backend/lastUsers.ts";

// @ts-ignore
import { ServerRequest } from "https://deno.land/std/http/server.ts";

// @ts-ignore
import { failure, success } from "../src/backend/response.ts";

export default async (req: ServerRequest) => {
  try {
    success(req, await list());
  } catch (error) {
    failure(req, error.message);
  }
};
