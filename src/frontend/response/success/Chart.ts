import type { EnhancedPin } from "../../../backend/interace";
import load from "load-js/src/load-js.js";

export class Chart {
  private places: EnhancedPin[];
  private el: HTMLElement;
  private chart: google.visualization.GeoChart;

  private async load() {
    return new Promise(async (resolve) => {
      // @ts-ignore
      await import("https://www.gstatic.com/charts/loader.js");

      google.charts.load("current", {
        packages: ["geochart"],
      });
      google.charts.setOnLoadCallback(resolve);
    });
  }

  async init(parent: HTMLElement, places: EnhancedPin[]) {
    this.el = parent.querySelector("#chart");
    this.places = places;
    await this.load();

    const data = new google.visualization.DataTable();
    data.addColumn("number", "Lat");
    data.addColumn("number", "Long");
    data.addColumn("number", "Value");
    data.addColumn({ type: "string", role: "tooltip" });

    this.places.forEach(({ lat, lng, city, flags }) => {
      data.addRows([[lat, lng, flags.includes("been") ? 1 : 10, city]]);
    });

    const options:google.visualization.GeoChartOptions = {
      backgroundColor: {
        fill: "transparent",
        stroke: "#FFF",
        strokeWidth: 0,
      },
      datalessRegionColor: "#f5f5f5",
      displayMode: "markers",
      resolution: "countries",
      sizeAxis: { minValue: 1, maxValue: 200 },
      legend: "none",
      keepAspectRatio: true,
      width: this.el.offsetWidth - 40,
      colorAxis: { minValue: 1, maxValue: 10, colors: ["#ff0099", "#000"] },
    };

    this.chart = new google.visualization.GeoChart(this.el);

   
    this.chart.draw(data, options);
    return this;
  }
  async getImage(): Promise<Blob> {
    return new Promise((resolve) => {
      google.visualization.events.addListener(this.chart, "ready", async () => {
        const res = await fetch(this.chart.getImageURI());
        resolve(res.blob());
      });
    });
  }
}
