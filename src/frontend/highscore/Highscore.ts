import type { StatWithDate } from "../../backend/interace";

class Highscore {
  private el: HTMLFormElement;
  private doc: HTMLDocument;
  constructor(document: HTMLDocument) {
    this.doc = document;
  }

  public static timeSince(currentDate: Date, date: Date): string {
    const seconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);

    const plural = (interval: number): string => {
      return `${Math.floor(interval) > 1 ? "s" : ""}`;
    };
    let interval = seconds / 31536000;

    if (interval > 1) {
      return `${Math.floor(interval)} year${plural(interval)}`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} month${plural(interval)}`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} day${plural(interval)}`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} hour${plural(interval)}`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} minute${plural(interval)}`;
    }
    return `${Math.floor(seconds)} second${plural(seconds)}`;
  }
  async init() {
    this.el = this.doc.querySelector(".highscore");
    const highscore = (await (
      await fetch("/api/highscore")
    ).json()) as StatWithDate[];
    const currentDate = new Date();

    const tableBody = this.el.querySelector("table tbody") as HTMLTableElement;

    const new_tbody = document.createElement("tbody");
    const classes = ["lg:px-4", "border", "px-1", "py-2 text-right"].join(" ");
    const emoji = ["🏆", "🥈", "🥉"];

    highscore.forEach(({ username, cities, countries, date, url }, index) => {
      const html = `
      <td class="${classes}">${
        emoji[index] ? emoji[index] : `${index + 1}.`
      }</td>
      <td class="${classes}"><a rel="noopener noreferrer nofollow" target="_blank" href="${url}">${username}</a></td>
      <td class="${classes}">${countries}</td>
      <td class="${classes}">${cities}</td>
      <td class="${classes}">${Highscore.timeSince(
        currentDate,
        new Date(date)
      )} ago</td>`;

      const row = new_tbody.insertRow();
      row.innerHTML = html;
      let className = "bg-gray-100";
      if (index % 2) {
        className = "bg-white";
      }
      row.classList.add(className);
    });
    tableBody.parentNode.replaceChild(new_tbody, tableBody);
    this.el.classList.remove("hidden");
  }
}

export { Highscore };
