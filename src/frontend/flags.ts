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
        if(country === "Republic of North Macedonia"){
          // remap to old country name https://github.com/meeDamian/country-emoji/blob/master/countries.json#L143
          country = "Macedonia";
        }
        
        return flag(country);
      })
      .join(" ")}(${unique.length})`;
  }
  been.innerText = flags;
}
