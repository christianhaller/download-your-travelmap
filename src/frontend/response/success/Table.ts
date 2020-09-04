import { Response } from "../../../backend/interace";
import type { Flags } from "./Flags";

export class Table {
  private el: HTMLTableElement | undefined;
  private flags: Flags;
  constructor(flags: Flags) {
    this.flags = flags;
  }
  init(parent: HTMLElement, data: Response) {
    this.el = parent.querySelector("table tbody") as HTMLTableElement;

    const new_tbody = document.createElement("tbody");
    const classes = ["lg:px-4", "border", "px-1", "py-2"].join(" ");

    data.places.forEach(({ country, city, flags }, index) => {
      const beenWantFave: string = flags
        .map((flag) => {
          if (flag === "been") {
            return "✅";
          }
          if (flag === "want") {
            return "💡";
          }
          if (flag === "fave") {
            return "❤️";
          }
        })
        .join(" ");

      const html = `<td class="${classes}">${this.flags.getFlag(
        country
      )}${country}</td><td class="${classes}">${city}</td><td class="${classes}">${beenWantFave}</td>`;
      const row = new_tbody.insertRow();
      row.innerHTML = html;
      let className = "bg-gray-100";
      if (index % 2) {
        className = "bg-white";
      }
      row.classList.add(className);
    });
    this.el.parentNode.replaceChild(new_tbody, this.el);
  }
}
