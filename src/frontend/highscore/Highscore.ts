import type { StatWithDate } from "../../backend/interace";

class Highscore {
  private el: HTMLFormElement;
  private doc: HTMLDocument;
  private tableBody: HTMLTableElement;
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

  async handler(e) {
    this.tableBody.classList.add("hidden");
    e.preventDefault();
    const url = e.target.getAttribute("href");
    const res = (await (await fetch(url)).json()) as StatWithDate[];
    this.render(res);
  }
  async init() {
    this.el = this.doc.querySelector(".highscore");
    this.tableBody = this.el.querySelector("table tbody") as HTMLTableElement;

    const switches: HTMLElement[] = Array.from(
      this.doc.querySelectorAll(".highscore__switch")
    );

    const events = ["click", "init"];

    switches.map((el) => {
      events.map((event) => {
        el.addEventListener(event, (evt) => this.handler(evt));
      });
    });
    switches[0].dispatchEvent(new CustomEvent("init"));
  }

  render(highscore) {
    const currentDate = new Date();
    const new_tbody = document.createElement("tbody") as HTMLTableBody;
    const classes = ["lg:px-4", "border", "px-1", "py-2"].join(" ");
    const emoji = [" 🏆 ", " 🥈 ", " 🥉 "];

    highscore.forEach(({ username, cities, countries, date, url }, index) => {
      const html = `
      <td class="${classes}"><a class="no-underline" href="/?url=${url}">${
        emoji[index] ? emoji[index] : `${index + 1}.`
      }</a></td>
      <td class="${classes}"><a rel="noopener noreferrer nofollow" target="_blank" href="${url}">${username}</a></td>
      <td class="${classes} text-right">${countries}</td>
      <td class="${classes} text-right">${cities}</td>
      <td class="${classes} text-right">${Highscore.timeSince(
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
    this.tableBody.parentNode.replaceChild(new_tbody, this.tableBody);
    this.tableBody = new_tbody;
    this.el.classList.remove("hidden");
  }
}

export { Highscore };
