import type { EnhancedPin, Stat } from "./interace.ts";

import "https://deno.land/x/dotenv/load.ts";

import type { Timestamp } from "./timeStamp30DaysAgo.ts";

import { S3 } from "./s3.ts";

class LastUsers {
  private timestamp: Timestamp;
  private s3: S3;

  constructor(timestamp: Timestamp, s3: S3) {
    this.timestamp = timestamp;
    this.s3 = s3;
  }

  async save({ username, countries, cities }: Stat): Promise<void> {
    const data = await this.s3.getObject();

    data[username] = {
      countries,
      cities,
      date: new Date().getTime(),
    };
    await this.s3.putObject(data);
  }
  stats(
    data: EnhancedPin[],
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

  async list(): Promise<Stat[] | undefined> {
    const timeStamp30DaysAgo = this.timestamp.getT();
    const last30Days = Object.entries(await this.s3.getObject())
      .map(([key, values]) => {
        return {
          username: key,
          ...values,
        };
      })
      .filter(({ date }) => {
        return date > timeStamp30DaysAgo;
      });
    return last30Days.sort(
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
  }
}

export { LastUsers };
