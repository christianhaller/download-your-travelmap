// @ts-ignore
import type {
  Credentials,
  Doc,
  DynamoDBClient,
} from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";

// @ts-ignore
import * as log from "https://deno.land/std/log/mod.ts";

// @ts-ignore
import type { EnhancedPinList } from "./interace.ts";

// @ts-ignore
import "https://deno.land/x/dotenv/load.ts";

class LastUsers {
  private tableName: string;
  private db: DynamoDBClient;
  constructor(createClient: Function) {
    this.tableName = "download-your-travelmap";
    const credentials: Credentials = {
      accessKeyId: Deno.env.get("APP_AWS_ACCESS_KEY_ID") as string,
      secretAccessKey: Deno.env.get("APP_AWS_SECRET_ACCESS_KEY") as string,
    };
    this.db = createClient({ credentials, region: "eu-central-1" });
  }

  private error(e: Error, params?: Doc) {
    log.info("problems with dynamodb");
    log.error(e);
    log.info(params);
    throw e;
  }
  async put(
    userId: string,
    countries: number,
    cities: number,
  ): Promise<void> {
    const params: Doc = {
      TableName: this.tableName,
      Item: {
        userId,
        countries,
        cities,
        date: +new Date(),
      },
    };
    try {
      await this.db.putItem(params);
      log.info("saved to db");
    } catch (e) {
      this.error(e, params);
    }
  }

  stats(
    data: EnhancedPinList,
  ): {
    countries: number;
    cities: number;
  } {
    const countries = [...new Set(data.map(({ country }) => country))];
    return {
      countries: countries.length,
      cities: data.length,
    };
  }

  async list(): Promise<Record<string, string>[] | undefined> {
    try {
      // @ts-ignore
      const { Items = [] } = await this.db.scan({ TableName: this.tableName });
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
    } catch (e) {
      this.error(e);
    }
  }
}

export { LastUsers };
