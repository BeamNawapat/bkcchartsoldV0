/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

am4core.useTheme(am4themes_dark);

var address = "0xd22730160D857c449515BE2F6E23dbDBd620326b";
var datanew = [];

function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (month.toString().length == 1) {
    month = "0" + month;
  }
  if (day.toString().length == 1) {
    day = "0" + day;
  }
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }
  if (second.toString().length == 1) {
    second = "0" + second;
  }
  var dateTime = day + "/" + month + "/" + year + " " + hour + ":" + minute;
  return dateTime;
}

// example usage: realtime clock
setInterval(function () {
  currentTime = getDateTime();
  currentTime;
}, 10000);

var api =
  "https://pgkgxc0tmc.execute-api.ap-northeast-1.amazonaws.com/dev/getPriceFoodCourtconnect";
var inputadd = "0xBD19370Bd3267b5526325BBCE1860e51a1350Cfc";
var outputadd = "0xDD2bb4e845Bd97580020d8F9F58Ec95Bf549c3D9";
var url = api + "/" + inputadd + "/" + outputadd;

var url2 = "https://nodeserverwithcatcrypto.herokuapp.com/api/luckykdolly";

const jsonput = [];

fetch(url, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    if (isNaN(data)) {
      return;
    }
    document.getElementById("PRICE").innerHTML =
      "Price : " + data + " LUCKY / 1 kDOLLY";
  });

fetch(url2, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach(function (val) {
      jsonput.push({ time: val.time, price: val.price });
    });
  });

setInterval(function () {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (isNaN(data)) {
        return;
      }
      document.getElementById("PRICE").innerHTML =
        "Price : " + data + " LUCKY / 1 kDOLLY";
    });
}, 5000);

setInterval(function () {
  fetch(url2, {
    method: "GET",
    headers: {
      Authorization: "Basic aGVyb2t1OTk4OjExMTN6YTk2c2Rzcw==",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const jsonput = [];

      data.forEach(function (val) {
        jsonput.push({ time: val.time, price: val.price });
      });
    });
}, 5000);
// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.data = jsonput;
setInterval(function () {
  chart.data = jsonput;
}, 5000); // Set up data source

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "time";
categoryAxis.renderer.minGridDistance = 150;
categoryAxis.renderer.labels.template.valign = "center";
categoryAxis.renderer.labels.template.fontSize = 15;

// Create value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.numberFormatter = new am4core.NumberFormatter();
valueAxis.numberFormatter.numberFormat = "#.############";
// Create series
var series1 = chart.series.push(new am4charts.LineSeries());
series1.dataFields.valueY = "price";
series1.dataFields.categoryX = "time";
series1.name = "price";
series1.strokeWidth = 3;
series1.tensionX = 0.8;
series1.tooltip.label.textAlign = "middle";
series1.tooltipText = "{price} LUCKY";
series1.tooltip.pointerOrientation = "vertical";

valueAxis.cursorTooltipEnabled = true;
valueAxis.renderer.labels.template.adapter.add("text", function (text) {
  return text + " LUCKY";
});

chart.paddingLeft = 0;
chart.paddingRight = 0;

chart.cursor = new am4charts.XYCursor();
chart.cursor.snapToSeries = series1;
chart.cursor.xAxis = categoryAxis;

chart.scrollbarX = new am4core.Scrollbar();
