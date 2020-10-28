import { TransformedStat } from "./interace.ts";
import { AWSSignerV4, createHash, log } from "../../deps.ts";
import type { Credentials } from "../../deps.ts";

export class S3 {
  public key: string;
  public signer: AWSSignerV4;

  constructor() {
    const credentials: Credentials = {
      awsAccessKeyId: Deno.env.get("APP_AWS_ACCESS_KEY_ID") as string,
      awsSecretKey: Deno.env.get("APP_AWS_SECRET_ACCESS_KEY") as string,
    };
    this.key = `${Deno.env.get("APP_ENV")}.json`;
    this.signer = new AWSSignerV4("eu-central-1", credentials);
  }
  private static headers(body = "") {
    return {
      "content-length": body.length.toString(),
      "x-amz-content-sha256": S3.sha256Hex(body),
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
    const body = JSON.stringify(data);
    const req = await this.signedRequest(body, "PUT");
    await fetch(req);
  }

  async getObject(): Promise<Record<string, TransformedStat>> {
    const req = await this.signedRequest(undefined, "GET");
    const response = await fetch(req);
    if (!response.ok) {
      log.error(response.statusText);
      return {};
    }
    return (await response.json()) as Record<string, TransformedStat>;
  }

  private static sha256Hex(data: string | Uint8Array): string {
    const hasher = createHash("sha256");
    hasher.update(data);
    return hasher.toString("hex");
  }
}
