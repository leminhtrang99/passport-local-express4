console.log("create-country-list has been included");

var checkedCountries = [];
// function buildList(){
//     checkedCountries.push(ele);
//     console.log(checkedCountries);
//   }
$("#map-list input:checkbox").change(function(){
    if ($(this).is(':checked')) {
        checkedCountries.push($(this).val());
        checkedCountries.sort();
        console.log(checkedCountries);
        console.log($(this).val() + " is now checked");
    } else {
        checkedCountries.splice(checkedCountries.indexOf($(this).val()), 1);
        checkedCountries.sort();
        console.log($(this).val() + " is now unchecked");
        console.log(checkedCountries);
    }
});
