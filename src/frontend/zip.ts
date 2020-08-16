import JSZip from "jszip/dist/jszip";

export async function zip({
  csv,
  kml,
  username,
  emojis,
  png,
}: {
  csv: any;
  kml: any;
  username: string;
  emojis: string;
  png: Blob;
}): Promise<Blob> {
  const zip = new JSZip();
  zip.file(`${username}.csv`, csv);
  zip.file(`${username}.kml`, kml);
  zip.file(`${username}.png`, png);
  if (emojis) {
    zip.file(`${username}.txt`, emojis);
  }
  return zip.generateAsync({ type: "blob" });
}
