#!/usr/bin/env deno run --version v1.20.5 --allow-net --log-level info --allow-env --allow-all

import { getUrl } from "../src/backend/url.ts";
import { validate } from "../src/backend/validate.ts";
import { getMap } from "../src/backend/map/index.ts";
import { failure, success } from "../src/backend/response.ts";
import { LastUsers } from "../src/backend/lastUsers.ts";
import { Timestamp } from "../src/backend/timeStampNDaysAgo.ts";
import { S3 } from "../src/backend/s3.ts";
import { AWSSignerV4, log } from "../deps.ts";
import { credentials, env } from "../src/backend/env.ts";

export default async ({ request }: Deno.RequestEvent) => {
  try {
    const url = getUrl({ request } as Deno.RequestEvent);
    log.info(url);
    validate(url);
    const map = await getMap(url);
    const l = new LastUsers(
      new Timestamp(),
      new S3(new AWSSignerV4("eu-central-1", credentials), env)
    );
    const { countries, cities } = l.stats(map.places);
    await l.save({
      username: map.username,
      cities,
      countries,
      url: url.href,
    });
    success(map);
  } catch (error) {
    failure(error.message);
  }
};
