import { Response } from "../../../backend/interace";
import type { Flags } from "./Flags";

export class Table {
  private Flags: Flags;
  private el: HTMLTableElement | undefined;
  private flags: Flags;
  constructor(flags: Flags) {
    this.flags = flags;
  }
  init(parent: HTMLElement, data: Response) {
    this.el = parent.querySelector("table tbody") as HTMLTableElement;

    const new_tbody = document.createElement("tbody");

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
      const html = `<td class="border px-4 py-2">${country} ${this.flags.getFlag(
        country
      )}</td><td class="border px-4 py-2">${city}</td><td class="border px-4 py-2">${beenWantFave}</td>`;
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
