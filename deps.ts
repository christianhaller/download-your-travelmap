import {
  assertArrayIncludes,
  assertEquals,
  assertRejects,
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.161.0/testing/asserts.ts";

import { encode } from "https://deno.land/std@0.161.0/encoding/hex.ts";

import {
  AWSSignerV4,
  Credentials,
} from "https://deno.land/x/aws_sign_v4@1.0.2/mod.ts";

import {
  resolvesNext,
  spy,
  stub,
} from "https://deno.land/x/mock@0.15.2/mod.ts";
import * as log from "https://deno.land/std@0.161.0/log/mod.ts";

import "https://deno.land/x/dotenv@v3.2.0/load.ts";

export {
  assertArrayIncludes,
  assertEquals,
  assertRejects,
  assertStrictEquals,
  assertThrows,
  AWSSignerV4,
  encode,
  log,
  resolvesNext,
  spy,
  stub,
};

export type { Credentials };
