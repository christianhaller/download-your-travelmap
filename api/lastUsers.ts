// @ts-ignore
import { LastUsers } from "../src/backend/lastUsers.ts";
// @ts-ignore
import type { ServerRequest } from "https://deno.land/std/http/server.ts";
// @ts-ignore
import { failure, success } from "../src/backend/response.ts";
// @ts-ignore
import { Timestamp } from "../src/backend/timeStamp30DaysAgo.ts";

export default async (req: ServerRequest) => {
  try {
    success(req, (await new LastUsers(new Timestamp()).list()) || {}, 60);
  } catch (error) {
    failure(req, error.message);
  }
};
