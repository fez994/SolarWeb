$(document).ready(function(){

// Hiding the data div to display it later
$('.actuals').hide();
$('.plant').hide();



// Dropdown Menu

$(".dropdown-menu li a").click(function(){
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  window.g = $(this).attr("value");
  window.n = $(this).attr("data-value");
  window.v = $(this).attr("title");
		console.log(v);
});



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
			console.log(contents);
			var ghi = contents.forecasts[0].ghi;
			var dni = contents.forecasts[0].dni;
			var dhi = contents.forecasts[0].dhi;
			useData(ghi, dni, dhi);
			
		})
		.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
	}

	// Displaying Data
	function useData(ghi, dni, dhi) {
		var sum = ghi + dni + dhi;
		$('#pv_type').text(g);
		$('#performance').text(" is " + n);
		$('#irradiance-data').text(sum + " W/m^2 ");
		$('#kw-available').text(Math.round(sum * v ) + " W/m^2 ");
		$('.actuals').show();
	}
	
} // end lfc



}); // end document ready function






























