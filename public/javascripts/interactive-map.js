// var asiaDictionary = new Map();
// var africaDictionary = new Map();
// var oceaniaDictionary = new Map();
// var northAmericaDictionary = new Map();
// var southAmericaDictionary = new Map();
// var europeDictionary = new Map();



// for (var i = 0; i < asia.length; i++) {
//   asiaDictionary.set(asia[i], asiaCodes[i]);
// }
// for (var i = 0; i < africa.length; i++) {
//   africaDictionary.set(africa[i], africaCodes[i]);
// }
// for (var i = 0; i < oceania.length; i++) {
//   oceaniaDictionary.set(oceania[i], oceaniaCodes[i]);
// }
// for (var i = 0; i < northAmerica.length; i++) {
//   northAmericaDictionary.set(northAmerica[i], northAmericaCodes[i]);
// }
// for (var i = 0; i < southAmerica.length; i++) {
//   southAmericaDictionary.set(southAmerica[i], southAmericaCodes[i]);
// }
// for (var i = 0; i < southAmerica.length; i++) {
//   europeDictionary.set(europe[i], europeCodes[i]);
// }

var checkedCountries = [];


// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var worldMap = am4core.create("mapdiv", am4maps.MapChart);
worldMap.getAreasFromMap = true;


// Set map definition
worldMap.geodata = am4geodata_worldHigh;

// Set projection
worldMap.projection = new am4maps.projections.Miller();


// Series for World map
var worldSeries = worldMap.series.push(new am4maps.MapPolygonSeries());
worldSeries.exclude = ["AI", "AX"];
worldSeries.useGeodata = true;

var polygonTemplate = worldSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = worldMap.colors.getIndex(0);

// Hover state
var hoverState = polygonTemplate.states.create("hover");
hoverState.properties.fill = worldMap.colors.getIndex(0).brighten(-0.5);

// Active state
var activeState = polygonTemplate.states.create("active");
activeState.properties.fill = worldMap.colors.getIndex(3).brighten(-0.5);


//Fetch data from mongodb

//console.log(visitedCountries);
worldSeries.events.once("ready", checkBoxes);
function checkBoxes() {
  for (var i = 0; i < visitedCountries.length; i++) {
    var countryCode = visitedCountries[i];
    //console.log(countryCode)
    var selectedArea = worldSeries.getPolygonById(countryCode);
    //console.log("world series: ", worldSeries.getPolygonById("CA"));
    var checkbox = jQuery("input[value=" + countryCode + "]");
    checkbox.prop("checked", true);
    selectedArea.isActive = true;
  }
}

// Event to toggle "active" state and trigger checkbox state toggle
polygonTemplate.events.on("hit", function (ev) {
  var countryCode = ev.target.dataItem.dataContext.id;
  ev.target.isActive = !ev.target.isActive;
  // if (ev.target.isActive == true) {
  //   checkedCountries.push(countryCode);
  //   checkedCountries.sort();
  // } else {
  //   checkedCountries.splice(checkedCountries.indexOf(countryCode), 1);
  //   checkedCountries.sort();
  // }
  var checkbox = jQuery("input[value=" + countryCode + "]");
  var anchor = jQuery(checkbox).parents(".tab-pane").attr("id");
  checkbox.prop("checked", !checkbox.prop("checked"));
  jQuery(".container .nav-tabs [data-anchor=" + anchor + "]").tab("show");
});

//Event to toggle checkbox state and trigger map area state
$("#map-list input:checkbox").click(function () {
  var countryCode = ($(this).val());
  //var checkbox = jQuery("input[value=" + countryCode + "]");
  var selectedArea = worldSeries.getPolygonById(countryCode);
  if ($(this).is(':checked')) selectedArea.isActive = true;
  else selectedArea.isActive = false;
});

//Build a chekced country list
$('input[type=checkbox').each(buildVisitedCountryList);
  console.log(checkedCountries);



function buildVisitedCountryList(countryCode) {
  if ($(this).is(':checked')) {
    checkedCountries.push(countryCode);
    checkedCountries.sort();
    // console.log(checkedCountries);
    // console.log($(this).val() + " is now checked");
  } else {
    checkedCountries.splice(checkedCountries.indexOf(countryCode), 1);
    checkedCountries.sort();
    // console.log($(this).val() + " is now unchecked");
    // console.log(checkedCountries);
  }
}

// Reset home position
function resetMap() {
  worldMap.goHome();
}

// Home button
var button = worldMap.chartContainer.createChild(am4core.Button);
button.padding(5, 5, 5, 5);
button.width = 20;
button.align = "right";
button.marginRight = 15;
button.events.on("hit", function () {
  worldMap.goHome();
});
button.icon = new am4core.Sprite();
button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";



//Allow change of projections
var eckertProjection = new am4maps.projections.Eckert6();
var equirectangularProjection = new am4maps.projections.Projection();
var mercatorProjection = new am4maps.projections.Mercator();
var millerProjection = new am4maps.projections.Miller();
var orthographicProjection = new am4maps.projections.Orthographic();