import { flag } from "country-emoji";
import type { EnhancedPin } from "../backend/interace";

export function flags(places: EnhancedPin[], language: string) {
  const been = document.querySelector(".been") as any;
  let flags = "";
  if (language === "en") {
    const unique = [
      ...new Set(
        places.map(({ country }) => {
          return country;
        })
      ),
    ];
    flags = `${unique
      .map((country) => {
        return flag(country);
      })
      .join(" ")}(${unique.length})`;
  }
  been.innerText = flags;
}
