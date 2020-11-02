import { LastUsers } from "../src/backend/lastUsers.ts";
import { failure, success } from "../src/backend/response.ts";
import { Timestamp } from "../src/backend/timeStampNDaysAgo.ts";
import { S3 } from "../src/backend/s3.ts";
import { AWSSignerV4, ServerRequest } from "../deps.ts";
import { credentials, env } from "../src/backend/env.ts";

export default async (req: ServerRequest) => {
  try {
    success(
      req,
      await new LastUsers(
        new Timestamp(),
        new S3(new AWSSignerV4("eu-central-1", credentials), env),
      ).list(),
      "60",
    );
  } catch (error) {
    failure(req, error.message);
  }
};
