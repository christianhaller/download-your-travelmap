import { TransformedStat } from "./interace.ts";
import { createHash } from "../../deps.ts";
import type { AWSSignerV4 } from "../../deps.ts";

export class S3 {
  public key: string;
  public signer: AWSSignerV4;

  constructor(signer: AWSSignerV4, key: string) {
    this.key = `${key}.json`;
    this.signer = signer;
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
      return {};
    }
    const json = (await response.json()) as Record<string, TransformedStat>;
    // log.info(json);
    return json;
  }

  private static sha256Hex(data: string | Uint8Array): string {
    const hasher = createHash("sha256");
    hasher.update(data);
    return hasher.toString("hex");
  }
}
