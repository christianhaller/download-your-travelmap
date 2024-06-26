import {
  assertArrayIncludes,
  assertEquals,
  assertRejects,
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.224.0/assert/mod.ts";

import {
  AWSSignerV4,
  Credentials,
} from "https://deno.land/x/aws_sign_v4@1.0.2/mod.ts";

import * as mock from "https://deno.land/x/mock@0.15.2/mod.ts";

const {
  resolvesNext,

  spy,
  stub,
} = mock;

import * as log from "https://deno.land/std@0.224.0/log/mod.ts";

import "https://deno.land/x/dotenv@v3.2.2/load.ts";

export {
  assertArrayIncludes,
  assertEquals,
  assertRejects,
  assertStrictEquals,
  assertThrows,
  AWSSignerV4,
  resolvesNext,
  log,
  spy,
  stub,
};

export type { Credentials };
