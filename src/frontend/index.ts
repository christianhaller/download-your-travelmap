import JSZip from "jszip/dist/jszip";

const fn = async () => {
  const res = await fetch(
    "https://deno.christianhaller.com/api?url=http://www.tripadvisor.com/members/chris"
  );
  const json = await res.json();
  console.log(json);

  var zip = new JSZip();
  zip.file("Hello.txt", "Hello World\n");
  const zipres = await zip.generateAsync({ type: "blob" });
  console.log(zipres);
};
fn();
