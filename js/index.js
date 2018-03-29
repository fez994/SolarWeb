$(document).ready(function(){

//Global Vars 
var address;
var lat;
var lon;
var get;


$('#btn').click(function() {
	// getting the address from the form
	var objAddress = $('#address').serializeArray();
	var address = objAddress[0].value;
	// Turning the Address to long and lat coordinates using the google maps api
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAIACAlD9aOoq-pox0MGpo3bTM5aplo_Jg";
	var get = $.getJSON(url, function(data) {
	// getting lat and long from the address
	var lat = data.results[0].geometry.location.lat;
	var lon = data.results[0].geometry.location.lng;

	// Requesting data from the solcast API
	var solcast = "https://api.solcast.com.au/radiation/forecasts?longitude="+lon+"&latitude="+lat+"&api_key=fB0Zk_1cWKWI8clCSe98ZyBTWctbcyR3";
	
	var myData = $.getJSON(solcast, function(files) {
		console.log(files);
	});





	});	// end get function
	


	
}); // end btn click function












}); // end document ready function






























