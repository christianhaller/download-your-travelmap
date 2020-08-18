import { flag } from "country-emoji";

import type { Response } from "../../../backend/interace";

export class Flags {
  private el: HTMLElement;
  private data: Response;
  private flagString: string | undefined;

  init(parent: HTMLElement, data: Response) {
    this.data = data;
    this.el = parent.querySelector(".been");
    this.flagString = this.createString();
    this.render();
    return this;
  }
  private createString(): string | undefined {
    if (this.data.language !== "en") {
      return;
    }

    const unique = [
      ...new Set(
        this.data.places
          .filter(({ flags }) => {
            return flags.includes("been");
          })
          .map(({ country }) => {
            return country;
          })
      ),
    ];
    console.table(unique);
    return `${unique
      .map((country) => {
        if (country === "Republic of North Macedonia") {
          // remap to old country name https://github.com/meeDamian/country-emoji/blob/master/countries.json#L143
          country = "Macedonia";
        }

        return flag(country);
      })
      .join(" ")}(${unique.length})`;
  }
  getString(): string | undefined {
    return this.flagString;
  }
  private render() {
    this.el.innerText = this.flagString;
  }
}
