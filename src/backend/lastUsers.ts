// @ts-ignore
import {
  createClient,
  Credentials,
  Doc,
} from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";

// @ts-ignore
import * as log from "https://deno.land/std/log/mod.ts";

// @ts-ignore
import type { EnhancedPinList } from "./interace.ts";

// @ts-ignore
import "https://deno.land/x/dotenv/load.ts";

const credentials: Credentials = {
  accessKeyId: Deno.env.get("APP_AWS_ACCESS_KEY_ID") as string,
  secretAccessKey: Deno.env.get("APP_AWS_SECRET_ACCESS_KEY") as string,
};

const dyno = createClient({ credentials, region: "eu-central-1" });
const TableName = "download-your-travelmap";

const put = async (
  userId: string,
  countries: number,
  cities: number,
): Promise<void> => {
  const params = {
    TableName,
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

const list = async (): Promise<Record<string, string>[]> => {
  // @ts-ignore
  const { Items } = await dyno.scan({ TableName });
  return Items.sort(
    // @ts-ignore
    ({ countries: countriesA }, { countries: countriesB }) => {
      if (countriesA < countriesB) {
        return 1;
      }
      if (countriesA > countriesB) {
        return -1;
      }
      return 0;
    },
  );
};

export { list, put, stats };
