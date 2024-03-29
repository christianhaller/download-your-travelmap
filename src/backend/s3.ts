import { TransformedStat } from "./interace.ts";

import type { AWSSignerV4 } from "../../deps.ts";
import { log } from "../../deps.ts";

export class S3 {
  public key: string;
  public signer: AWSSignerV4;

  constructor(signer: AWSSignerV4, key: string) {
    this.key = `${key}.json`;
    this.signer = signer;

    log.info(key);
  }
  private static async headers(body = "") {
    return {
      ...(body.length && { "content-length": body.length.toString() }),
      "x-amz-content-sha256": await S3.sha256Hex(body),
    };
  }
  public async signedRequest(body: string | undefined, method: "PUT" | "GET") {
    const headers = await S3.headers(body);
    const request = new Request(
      `https://download-your-travelmap.s3.eu-central-1.amazonaws.com/${this.key}`,
      {
        method,
        headers,
        body,
      },
    );
    return this.signer.sign("s3", request);
  }

  async putObject(data: unknown): Promise<void> {
    //  log.info(data);
    const body = JSON.stringify(data);
    const req = await this.signedRequest(body, "PUT");
    await fetch(req);
    // log.debug("put done");
  }

  async getObject(): Promise<Record<string, TransformedStat>> {
    const req = await this.signedRequest(undefined, "GET");
    const response = await fetch(req);
    if (!response.ok) {
      log.info(response);
      throw Error("s3 fucked up");
    }
    const json = (await response.json()) as Record<string, TransformedStat>;
    // log.info(json);
    return json;
  }

  private static async sha256Hex(data: string): Promise<string> {
    return bytesAsHex(await hashSha256(new TextEncoder().encode(data)));
  }
}

async function hashSha256(content: Uint8Array) {
  const buffer = await crypto.subtle.digest("SHA-256", content);
  return new Uint8Array(buffer);
}

export function bytesAsHex(buffer: Uint8Array) {
  return [...buffer].map((x) => x.toString(16).padStart(2, "0")).join("");
}
