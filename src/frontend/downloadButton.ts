import bytes from "bytes";

export function downloadButton(blob: Blob, username: string) {
  const link = document.getElementById("blob") as HTMLAnchorElement;
  link.href = window.URL.createObjectURL(blob);
  link.download = `${username}.zip`;
  link.classList.remove("cursor-not-allowed");
  link.querySelector("span").innerText = `download (${bytes(blob.size)})`;
}
