// @ts-ignore
import {
  createClient,
  Credentials,
} from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";

// @ts-ignore
import * as log from "https://deno.land/std/log/mod.ts";

// @ts-ignore
import type { EnhancedPinList } from "./interace.ts";

const credentials: Credentials = {
  accessKeyId: Deno.env.get("APP_AWS_ACCESS_KEY_ID") as string,
  secretAccessKey: Deno.env.get("APP_AWS_SECRET_ACCESS_KEY") as string,
};
const dyno = createClient({ credentials });

const put = async (
  userId: string,
  countries: number,
  cities: number,
): Promise<void> => {
  const params = {
    TableName: "download-your-travelmap",
    Item: {
      userId,
      countries,
      cities,
      date: +new Date(),
    },
  };
  try {
    await dyno.putItem(params);
    log.info("saved to db");
  } catch (e) {
    log.info(e);
    log.info("problems with dynamodb");
    log.info(params);
  }
};

const stats = (
  data: EnhancedPinList,
): {
  countries: number;
  cities: number;
} => {
  const countries = [...new Set(data.map(({ country }) => country))];
  return {
    countries: countries.length,
    cities: data.length,
  };
};

export { put, stats };
