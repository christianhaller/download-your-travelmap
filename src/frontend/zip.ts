import JSZip from "jszip/dist/jszip";

export async function zip({
  csv,
  kml,
  username,
  emojis,
}: {
  csv: any;
  kml: any;
  username: string;
  emojis:string;
}): Promise<Blob> {
  const zip = new JSZip();
  zip.file(`${username}.csv`, csv);
  zip.file(`${username}.kml`, kml);
  if(emojis){
    zip.file(`${username}.txt`, emojis);
  }
  return zip.generateAsync({ type: "blob" });
}
