import { Credentials } from "../../deps.ts";

const credentials = (): Credentials => {
  return {
    awsAccessKeyId: Deno.env.get("APP_AWS_ACCESS_KEY_ID") as string,
    awsSecretKey: Deno.env.get("APP_AWS_SECRET_ACCESS_KEY") as string,
  };
};
const env = Deno.env.get("APP_ENV") as string;

export { credentials, env };
