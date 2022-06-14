import type { EnhancedPin } from "../../../backend/interace";
import load from "load-js/src/load-js.js";

const getOptions = (width, pointSize): google.visualization.GeoChartOptions => {
  return {
    backgroundColor: {
      fill: "transparent",
      stroke: "#FFF",
      strokeWidth: 0,
    },
    datalessRegionColor: "#f5f5f5",
    pointSize,
    displayMode: "markers",
    resolution: "countries",
    sizeAxis: { minValue: 1, maxValue: 200 },
    legend: "none",
    keepAspectRatio: true,
    width,
    colorAxis: { minValue: 1, maxValue: 10, colors: ["#ff0099", "#000"] },
  };
};

const getData = (places: EnhancedPin[]) => {
  const data = new google.visualization.DataTable();
  data.addColumn("number", "Lat");
  data.addColumn("number", "Long");
  data.addColumn("number", "Value");
  data.addColumn({ type: "string", role: "tooltip" });

  places.forEach(({ lat, lng, city, flags }) => {
    data.addRows([[lat, lng, flags.includes("been") ? 1 : 10, city]]);
  });
  return data;
};

export class Chart {
  private places: EnhancedPin[];
  private el: HTMLElement;
  private chart: google.visualization.GeoChart;

  private load() {
    return new Promise(async (resolve) => {
      await load({
        url: "https://www.gstatic.com/charts/loader.js",
        async: true,
      });

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

    this.chart = new google.visualization.GeoChart(this.el);

    this.chart.draw(getData(this.places), getOptions(this.el.offsetWidth - 40));
    return this;
  }
  async getImage(): Promise<Blob> {
    return new Promise((resolve) => {
      const chart = new google.visualization.GeoChart(
        document.getElementById("image")
      );

      google.visualization.events.addListener(chart, "ready", async () => {
        const res = await fetch(chart.getImageURI());
        resolve(res.blob());
      });
      chart.draw(getData(this.places), getOptions(3000, 100));
    });
  }
}
