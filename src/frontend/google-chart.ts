import type { EnhancedPin } from "../backend/interace";

export function chart(places: EnhancedPin[]): Promise<Blob> {
  return new Promise((resolve) => {
    if (!google) {
      return;
    }

    google.charts.load("current", {
      packages: ["geochart"],
      mapsApiKey: "AIzaSyCsIs5SJoutxcR0Pla5bq7lFVcAW_rr17Q",
    });
    google.charts.setOnLoadCallback(drawVisualization);

    function drawVisualization() {
      const data = new google.visualization.DataTable();

      data.addColumn("number", "Lat");
      data.addColumn("number", "Long");
      data.addColumn("number", "Value");

      data.addColumn({ type: "string", role: "tooltip" });

      places.forEach(({ lat, lng, city }) => {
        data.addRows([[lat, lng, 2, city]]);
      });

      const el = document.getElementById("visualization");

      const options = {
        backgroundColor: {
          fill: "transparent",
          stroke: "#FFF",
          strokeWidth: 0,
        },
        datalessRegionColor: "#f5f5f5",
        displayMode: "markers",
        resolution: "countries",
        sizeAxis: { minValue: 0, maxValue: 24 },
        region: "world",

        legend: "none",
        keepAspectRatio: true,
        width: el.offsetWidth,

        colorAxis: { minValue: 0, maxValue: 100, colors: ["#ff0099", "#000"] }, // orange to blue
      };

      const chart = new google.visualization.GeoChart(el);

      google.visualization.events.addListener(chart, "ready", async () => {
        const res = await fetch(chart.getImageURI());
        const blob = await res.blob();
        return resolve(blob);
      });

      // @ts-ignore
      chart.draw(data, options);
    }
  });
}
