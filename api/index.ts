// import { ServerRequest } from "../src/backend/deps.ts";
import { getUrl } from "../src/backend/url.ts";
import { validate } from "../src/backend/validate.ts";
import { getMap } from "../src/backend/map/index.ts";
import { failure, success } from "../src/backend/response.ts";
import { LastUsers } from "../src/backend/lastUsers.ts";
import { Timestamp } from "../src/backend/timeStamp30DaysAgo.ts";
import { S3 } from "../src/backend/s3.ts";
import { ServerRequest } from "../deps.ts";

export default async (req: ServerRequest) => {
  try {
    const url = getUrl(req);
    validate(url);
    const map = await getMap(url);
    const l = new LastUsers(new Timestamp(), new S3());
    const { countries, cities } = l.stats(map.places);
    await l.save({
      username: map.username,
      cities,
      countries,
      url: url.href,
    });
    success(req, map);
  } catch (error) {
    failure(req, error.message);
  }
};
