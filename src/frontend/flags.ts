import { flag } from "country-emoji";
import type { EnhancedPin } from "../backend/interace";

export function flags(places: EnhancedPin[], language: string) {
  const been = document.querySelector(".been") as any;
  let flags = "";
  if (language === "en") {
    flags = [
      ...new Set(
        places.map(({ country }) => {
          return flag(country);
        })
      ),
    ].join("");
  }
  been.innerText = flags;
}
