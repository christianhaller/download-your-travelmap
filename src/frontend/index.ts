import JSZip from "jszip/dist/jszip";
import { kml } from "./kml";
import { csv } from "./csv";

const fn = async () => {
  const res = await fetch(
    "/api?url=http://www.tripadvisor.com/members/christianhaller"
  );
  const json = await res.json();
  const kmlres = kml(json);
  const csvres = csv(json);
  console.log(csvres);

  var zip = new JSZip();
  zip.file("Hello.txt", "Hello World\n");
  const zipres = await zip.generateAsync({ type: "blob" });
  console.log(zipres);
};
fn();
