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

		const proxyurl = "https://cors-anywhere.herokuapp.com/";
		const url = 'https://api.solcast.com.au/radiation/forecasts?format=json&latitude=' + lat +'&longitude='+ lon +'&api_key=fB0Zk_1cWKWI8clCSe98ZyBTWctbcyR3'; // site that doesn’t send Access-Control-*
		fetch(proxyurl + url)
		.then(response => response.json())
		.then(contents =>  {
			console.log("The global Horizontal Irradiance is " + contents.forecasts[0].ghi + " W/m2");
			console.log("The direct normal irradiance is " + contents.forecasts[0].dni + " W/m2");
			console.log("The diffuse horizontal irradiance is " + contents.forecasts[0].dhi + " W/m2");
			var iTot  = eval(contents.forecasts[0].ghi + contents.forecasts[0].dni + contents.forecasts[0].dhi);
			console.log(iTot);

		})
		.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
	}
	
} // end lfc



}); // end document ready function






























