#!/usr/bin/env deno run --version v1.20.5 --allow-net --log-level info --allow-env

import { LastUsers } from "../src/backend/lastUsers.ts";
import { failure, success } from "../src/backend/response.ts";
import { Timestamp } from "../src/backend/timeStampNDaysAgo.ts";
import { S3 } from "../src/backend/s3.ts";
import { AWSSignerV4, log } from "../deps.ts";
import { credentials, env } from "../src/backend/env.ts";

export default async ({
  request: req,
}: Deno.RequestEvent): Promise<Response> => {
  try {
    let days = 30;
    log.info(req.url.match("alltime"));
    if (req.url.match("alltime")) {
      days = 99999;
    }
    return success(
      await new LastUsers(
        new Timestamp(),
        new S3(new AWSSignerV4("eu-central-1", credentials()), env),
      ).list(days),
      "60",
    );
  } catch (error) {
    log.error(JSON.stringify(error));
    return failure(error.message);
  }
};
