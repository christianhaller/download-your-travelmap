import { S3 } from "./s3.ts";
import {
  assertEquals,
  assertRejects,
  AWSSignerV4,
  resolvesNext,
  stub,
} from "../../deps.ts";

Deno.test({
  name: "s3 getObject",
  fn: async () => {
    const s = stub(
      self,
      "fetch",
      resolvesNext([
        {
          ok: true,
          json: () => {
            return {};
          },
        },
      ]),
    );

    const res = await new S3(
      new AWSSignerV4("eu-central-1", {
        awsAccessKeyId: "rrr",
        awsSecretKey: "ddd",
      }),
      "local",
    ).getObject();
    assertEquals(res, {});
    s.restore();
  },
});

Deno.test({
  name: "s3 getObject not ok",
  fn: async () => {
    const s = stub(
      self,
      "fetch",
      resolvesNext([
        {
          statusText: "fuck",
          ok: false,
            json: () => {},
        },
      ]),
    );

    await assertRejects(
      () => {
        return new S3(
          new AWSSignerV4("eu-central-1", {
            awsAccessKeyId: "rrr",
            awsSecretKey: "ddd",
          }),
          "local",
        ).getObject();
      },
      Error,
      "s3 fucked up",
    );

    s.restore();
  },
});

Deno.test({
  name: "s3 putObject",
  fn: async () => {
    const s = stub(
      self,
      "fetch",
      resolvesNext([
        {
          ok: true,
          json: () => {},
        },
      ]),
    );

    await new S3(
      new AWSSignerV4("eu-central-1", {
        awsAccessKeyId: "rrr",
        awsSecretKey: "ddd",
      }),
      "local",
    ).putObject({});
    assertEquals(
      s.calls[0].args[0].url,
      "https://download-your-travelmap.s3.eu-central-1.amazonaws.com/local.json",
    );
    s.restore();
  },
});
