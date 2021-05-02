import URL from "URL";
import { LastUsers } from "../src/backend/lastUsers.ts";
import { failure, success } from "../src/backend/response.ts";
import { Timestamp } from "../src/backend/timeStampNDaysAgo.ts";
import { S3 } from "../src/backend/s3.ts";
import { AWSSignerV4, log, ServerRequest } from "../deps.ts";
import { credentials, env } from "../src/backend/env.ts";

export default async (req: ServerRequest) => {
  try {
    let days = 30;
    log.info(req.url.match("alltime"));
    if (req.url.match("alltime")) {
      days = 99999;
    }
    success(
      req,
      await new LastUsers(
        new Timestamp(),
        new S3(new AWSSignerV4("eu-central-1", credentials), env)
      ).list(days),
      "60"
    );
  } catch (error) {
    log.error(JSON.stringify(error));
    failure(req, error.message);
  }
};
