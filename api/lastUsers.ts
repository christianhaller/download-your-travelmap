// @ts-ignore
import { LastUsers } from "../src/backend/lastUsers.ts";

// @ts-ignore
import { ServerRequest } from "https://deno.land/std/http/server.ts";

// @ts-ignore
import { failure, success } from "../src/backend/response.ts";

import { createClient } from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";

export default async (req: ServerRequest) => {
  try {
    success(req, await new LastUsers(createClient).list() || {});
  } catch (error) {
    failure(req, error.message);
  }
};
