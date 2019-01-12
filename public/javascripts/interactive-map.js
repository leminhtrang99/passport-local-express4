var africa = ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina', 'Burundi', 'Cameroon', 
 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros', 'Republic of the Congo', 
 'Democratic Republic of Congo', "Côte d'Ivoire", 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia',
 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'GuineaBissau', 'Kenya', 'Lesotho', 'Liberia',
 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia',
 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone',
 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Swaziland', 'Tanzania', 'Togo', 'Tunisia',
 'Uganda', 'Zambia', 'Zimbabwe'];
var asia =['Afghanistan', 'Bahrain','Bangladesh','Bhutan','Brunei','Burma (Myanmar)',
'Cambodia','China','Georgia', 'Hong Kong', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 
 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 
 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Philippines', 'Qatar', 'Russian Federation', 'Saudi Arabia', 
 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand','Timor-Leste', 'Turkey', 'Turkmenistan', 
 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'];
var europe=['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 
 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 
 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro',
 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia',
 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom', 'Vatican City'];
var oceania =['Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 
'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'];
var northAmerica = ['Antigua and Barbuda', 'The Bahamas', 'Barbados', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 
 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 
 'Trinidad and Tobago', 'United States'];
var southAmerica=['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'];

var africaCodes=["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", 
"CV", "CF", "TD", "KM", "CD", "CG", 
"CI", "DJ", "EG", "GQ", "ER", "ET", 
"GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR",
"LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", 
"NE", "NG", "RW", "ST", "SN", "SC", "SL", 
"SO", "ZA", "SS", "SD", "SZ", "TZ", "TG", "TN", 
"UG", "ZM", "ZW"];
var asiaCodes=["AF", "BH", "BD", "BT", "BN", "MM", 
"KH", "CN", "GE", "HK", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", 
"KZ", "KW", "KG", "LA", "LB", "MY", "MV", "MN", 
"NP", "KP", "OM", "PK", "PH", "QA", "RU", "SA", 
"SG", "KR", "LK", "SY", "TW", "TJ", "TH", "TL", "TR", "TM", 
"AE", "UZ", "VN", "YE"];
var europeCodes=["AL", "AD", "AM", "AT", "AZ", "BY", "BE", "BA", "BG", 
"HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", 
"HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MK", "MT", "MD", "MC", "ME", 
"NL", "NO", "PL", "PT", "RO", "SM", "RS", "SK", "SI", 
"ES", "SE", "CH", "UA", "GB", "VA"];
var oceaniaCodes=["AU", " FJ", "KI", "MH", "FM", "NR", "NZ", 
"PW", "PG", "WS", "SB", "TO", "TV", "VU"];
var northAmericaCodes=["AG", "BS", "BB", "BZ", "CA", "CR", "CU", "DM", "DO", "SV", 
"GD", "GT", "HT", "HN", "JM", "MX", "NI", "PA", "KN", "LC", "VC", 
"TT", "US"];
var southAmericaCodes=["AR", "BO", "BR", "CL", "CO", "EC", "GY", "PY", "PE", "SR", "UY", "VE"];

var asiaDictionary = new Map();
var africaDictionary = new Map();
var oceaniaDictionary = new Map();
var northAmericaDictionary = new Map();
var southAmericaDictionary = new Map();
var europeDictionary = new Map();

for (var i = 0; i < asia.length; i++) {
    asiaDictionary.set(asia[i], asiaCodes[i]);
}
for (var i = 0; i < africa.length; i++) {
    africaDictionary.set(africa[i], africaCodes[i]);
}
for (var i = 0; i < oceania.length; i++) {
    oceaniaDictionary.set(oceania[i], oceaniaCodes[i]);
}
for (var i = 0; i < northAmerica.length; i++) {
    northAmericaDictionary.set(northAmerica[i], northAmericaCodes[i]);
}
for (var i = 0; i < southAmerica.length; i++) {
    southAmericaDictionary.set(southAmerica[i], southAmericaCodes[i]);
}
for (var i = 0; i < southAmerica.length; i++) {
    europeDictionary.set(europe[i], europeCodes[i]);
}

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

// Event to toggle "active" state and toggle checkbox state
polygonTemplate.events.on("hit", function(ev) {
  ev.target.isActive = !ev.target.isActive;
  countryCode = ev.target.dataItem.dataContext.id;
  console.log("id of selected country: " + ev.target.dataItem.dataContext.id)
  var checkbox = jQuery("input[value=" + countryCode + "]");
    checkbox.prop("checked",!checkbox.prop("checked"));
  var anchor = jQuery(checkbox).parents(".tab-pane").attr("id");
  console.log("anchor:" + anchor);
  jQuery(".container .nav-tabs [data-anchor=" + anchor + "]").tab("show");
});

//Event to toggle map highlight area

$("#map-list input:checkbox").change(function(){
    countryCode = ($(this).val());
      console.log("id of checked box: " + countryCode)
      var selectedArea = worldSeries.getPolygonById(countryCode);
  if ($(this).is(':checked')) {
      //heckedCountries.push($(this).val());
      //checkedCountries.sort();
      //console.log(checkedCountries);
      //console.log($(this).val() + " is now checked");
      // countryCode = ($(this).val());
      // console.log("id of checked box: " + countryCode)
      // var selectedArea = worldSeries.getPolygonById(countryCode);
      selectedArea.isActive = true;
  } else selectedArea.isActive = false;
      // checkedCountries.splice(checkedCountries.indexOf($(this).val()), 1);
      // checkedCountries.sort();
      // console.log($(this).val() + " is now unchecked");
      // console.log(checkedCountries);
});


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
button.events.on("hit", function() {
  worldMap.goHome();
});
button.icon = new am4core.Sprite();
button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";





// worldMap.addListener("clickMapObject", function(event) {
//     var CC = event.mapObject.id;
//     var checkbox = jQuery("input[value=" + CC + "]");
//     var anchor = jQuery(checkbox).parents(".tab-pane").attr("id");
//     var mapObject = event.mapObject;
//     map.selectedObject = map.dataProvider;
//     mapObject.showAsSelected = !mapObject.showAsSelected;
//     map.returnInitialColor(mapObject);
//     checkbox[0].checked = event.mapObject.showAsSelected;
//     jQuery(".map-list .nav-tabs [data-anchor=" + anchor + "]").tab("show");
//     map.updateSettings(true);
// });
