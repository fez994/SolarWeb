
$(document).ready(function(){


$('#btn').click(function() {

	lfc();

	});	// end btn function
	

function lfc () {
	// getting the address from the form
	var objAddress = $('#address').serializeArray();
	var address = objAddress[0].value;
	// Turning the Address to long and lat coordinates using the google maps api
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAIACAlD9aOoq-pox0MGpo3bTM5aplo_Jg";
	$.getJSON(url, function(data) {

	var lat = data.results[0].geometry.location.lat;
	var lon = data.results[0].geometry.location.lng;

	useCoordinates(lat, lon);
	});

	// requesting data from the lat and lon coordinades 
	function useCoordinates(lat, lon){

		// For the solcast forum: I tried both method, they all give me the same error 
		
		
		$.ajax({
			type: "Get",
			url: "https://api.solcast.com.au/radiation/forecasts?longitude="+lon+"&latitude="+lat+"&api_key=fB0Zk_1cWKWI8clCSe98ZyBTWctbcyR3&format=json?&callback=?",
			dataType: "jsonp",
			jsonp: false,
			jsonpCallback: "myJsonMethod",
			success: function(data) {
				console.log(data);
			},
			error: function() {
				console.log("It doesn't work");
			}

		});
	

	/*
		var myApi = "https://api.solcast.com.au/radiation/forecasts?longitude="+lon+"&latitude="+lat+"&api_key=fB0Zk_1cWKWI8clCSe98ZyBTWctbcyR3&format=json?&callback=?";
		$.getJSON(myApi, function(data) {
			console.log(data);
		});

	*/
	}
	

} // end lfc




}); // end document ready function






























