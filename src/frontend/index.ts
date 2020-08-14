import { kml } from "./kml";
import { csv } from "./csv";
import { zip } from "./zip";
import { downloadButton } from "./downloadButton";
import { flags } from "./flags";
import type { EnhancedPin, Response } from "../backend/interace";
import { validate } from "./validate";

const fn = async (e) => {
  e.preventDefault();
  try {
    const url = validate(input.value);
    submitIcon.classList.add("hidden");
    spinnerIcon.classList.remove("hidden");
    dl.classList.add("hidden");

    const res = await fetch(`/api?url=${url}`);
    spinnerIcon.classList.add("hidden");
    submitIcon.classList.remove("hidden");
    if (res.ok) {
      dl.classList.remove("hidden");

      const response: Response = await res.json();
      const { username, places, language } = response;
      const emojis = flags(places, language);
      const blob = await zip({
        csv: csv(places),
        kml: kml(response),
        username,
        emojis,
      });
      downloadButton(blob, username);
 
    } else {
      dl.classList.add("hidden");
    }
  } catch (e) {
    input.value = "";
    input.focus();
    console.log(e);
  }
};

const form = document.querySelector("form");
const input = form.querySelector("#url") as HTMLInputElement;
const submitIcon = form.querySelector(".js-submit-icon");
const spinnerIcon = form.querySelector(".js-spinner");
const dl = form.nextElementSibling;
form.addEventListener("submit", fn);
form.querySelector("button").classList.remove("cursor-not-allowed");
