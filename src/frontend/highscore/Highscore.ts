class Highscore {
  private el: HTMLFormElement;
  private doc: HTMLDocument;
  constructor(document: HTMLDocument) {
    this.doc = document;
  }

  private timeSince(date) {
    const seconds = Math.floor(((new Date() as any) - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  async init() {
    this.el = this.doc.querySelector(".highscore");
    const highscore = await (await fetch("/api/highscore")).json();

    const tableBody = this.el.querySelector("table tbody") as HTMLTableElement;

    const new_tbody = document.createElement("tbody");
    const classes = ["lg:px-4", "border", "px-1", "py-2 text-right"].join(" ");
    const emoji = ["🏆", "🥈", "🥉"];

    highscore.forEach(({ username, cities, countries, date, url }, index) => {
      const html = `
      <td class="${classes}">${
        emoji[index] ? emoji[index] : `${index + 1}.`
      }</td>
      <td class="${classes}"><a rel="noopener noreferrer" target="_blank" href="${url}">${username}</a></td>
      <td class="${classes}">${countries}</td>
      <td class="${classes}">${cities}</td>
      <td class="${classes} text-xs">${this.timeSince(
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
