export default async function (request: Request): Promise<Response> {
  console.log(request.url);
  return new Response("");
}
