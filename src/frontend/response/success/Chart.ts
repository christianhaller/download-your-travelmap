import type { EnhancedPinList } from "../../../backend/interace";

export class Chart {
  private places: EnhancedPinList;
  private el: HTMLElement;
  private chart: google.visualization.GeoChart;

  async load() {
    return new Promise((resolve) => {
      google.charts.load("current", {
        packages: ["geochart"],
        mapsApiKey: "AIzaSyCsIs5SJoutxcR0Pla5bq7lFVcAW_rr17Q",
      });
      google.charts.setOnLoadCallback(resolve);
    });
  }

  async init(parent: HTMLElement, places: EnhancedPinList) {
    if (!google) {
      throw "lib not loaded";
    }
    this.el = parent.querySelector("#chart");
    this.places = places;
    await this.load();

    const data = new google.visualization.DataTable();
    data.addColumn("number", "Lat");
    data.addColumn("number", "Long");
    data.addColumn("number", "Value");
    data.addColumn({ type: "string", role: "tooltip" });

    this.places.forEach(({ lat, lng, city, flags }) => {
      data.addRows([[lat, lng, flags.includes("been") ? 100 : 200, city]]);
    });

    const options = {
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
      colorAxis: { minValue: 1, maxValue: 2, colors: ["#ff0099", "#000"] }, // orange to blue
    };

    this.chart = new google.visualization.GeoChart(this.el);

    // @ts-ignore
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
