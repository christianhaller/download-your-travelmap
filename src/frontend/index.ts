import { kml } from "./kml";
import { csv } from "./csv";
import { zip } from "./zip";
import { downloadButton } from "./downloadButton";

const fn = async (e) => {
  e.preventDefault();
  submitIcon.classList.add("hidden");
  spinnerIcon.classList.remove("hidden");
  dl.classList.add("hidden");
  const url = input.value;
  const res = await fetch(`/api?url=${url}`);
  spinnerIcon.classList.add("hidden");
  submitIcon.classList.remove("hidden");
  if (res.ok) {
    dl.classList.remove("hidden");

    const { places, username } = await res.json();
    const blob = await zip({ csv: csv(places), kml: kml(places), username });
    downloadButton(blob, username);
  } else {
    dl.classList.add("hidden");
  }
};

const form = document.querySelector("form");
const input = form.querySelector("#url") as HTMLInputElement;
const submitIcon = form.querySelector(".js-submit-icon");
const spinnerIcon = form.querySelector(".js-spinner");
const dl = form.nextElementSibling;
form.addEventListener("submit", fn);
form.querySelector("button").classList.remove("cursor-not-allowed");
