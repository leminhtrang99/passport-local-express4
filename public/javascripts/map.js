console.log("map.js has been included");
//var checkedCountries = [];

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create("mapdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldHigh;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Series for World map
var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
worldSeries.exclude = ["AI", "AX"];
worldSeries.useGeodata = true;

var polygonTemplate = worldSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = chart.colors.getIndex(0);

// Hover state
var hoverState = polygonTemplate.states.create("hover");
hoverState.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

// Active state
var activeState = polygonTemplate.states.create("active");
activeState.properties.fill = chart.colors.getIndex(3).brighten(-0.5);

// Event to toggle "active" state
polygonTemplate.events.on("hit", function(ev) {
  ev.target.isActive = !ev.target.isActive;
});

// Reset home position
function resetMap() {
    chart.goHome();
}

// Home button
var button = chart.chartContainer.createChild(am4core.Button);
button.padding(5, 5, 5, 5);
button.width = 20;
button.align = "right";
button.marginRight = 15;
button.events.on("hit", function() {
  chart.goHome();
});
button.icon = new am4core.Sprite();
button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";

