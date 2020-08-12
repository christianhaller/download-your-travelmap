import JSZip from "jszip/dist/jszip";

export async function zip({ csv, kml, username }): Promise<Blob> {
  const zip = new JSZip();
  zip.file(`${username}.csv`, csv);
  zip.file(`${username}.kml`, kml);
  return zip.generateAsync({ type: "blob" });
}
