$(document).ready(function(){

// Hiding the data div to display it later
$('.plant').hide();



// Dropdown Menu
$(".dropdown-menu li a").click(function(){
  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  // Type of pv
  window.g = $(this).attr("value");
  // Performance percentage
  window.n = $(this).attr("data-value");
  // Performance percentage divided by 100, so if performance 16%  => 0.16
  window.v = $(this).attr("title");	
});


// starting lfc when the search button is pressed
$('#btn').click(function() {
	lfc();
	});	// end btn function
	

function lfc () {
	// Getting the address from the form
	var objAddress = $('#address').serializeArray();
	var address = objAddress[0].value;
	// Turning the Address to long and lat coordinates using the google maps api
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAIACAlD9aOoq-pox0MGpo3bTM5aplo_Jg";
	$.getJSON(url, function(data) {
	var lat = data.results[0].geometry.location.lat;
	var lon = data.results[0].geometry.location.lng;
	useCoordinates(lat, lon);
	});

	function useCoordinates(lat, lon){ 
		// Requesting SolCast data from the lat and lon coordinades 
		const proxyurl = "https://cors-anywhere.herokuapp.com/";
		const url = 'https://api.solcast.com.au/radiation/forecasts?format=json&latitude=' + lat +'&longitude='+ lon +'&api_key=fB0Zk_1cWKWI8clCSe98ZyBTWctbcyR3'; // site that doesn’t send Access-Control-*
		fetch(proxyurl + url)
		.then(response => response.json())
		.then(contents =>  {
			// Global Horizontal Irradiance
			var ghi = contents.forecasts[0].ghi;
			// Direct Normal Irradiance 
			var dni = contents.forecasts[0].dni;
			// Diffuse Horizontal Irradiance
			var dhi = contents.forecasts[0].dhi;
			useData(ghi, dni, dhi);
		})
		.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
	}

	// Displaying Data
	function useData(ghi, dni, dhi) {
		// Total Value of the Irradiance
		var sum = ghi + dni + dhi;
		// Getting the data of how many m^2 of panel the user have
		var panels = $('#sqrm').serializeArray();
		var sqrm = document.getElementById("sqrm").value;
		// Displaying type of pv
		$('#pv_type').text(g);
		// Displaying performance in % of the pv
		$('#performance').text(" is " + n);
		// Displaying the total irradiance value
		$('#irradiance-data').text(sum + " W/m^2 ");
		// Total irradiance * performance of the panel to get how much a single panel is producing
		var totalKw = Math.round(sum * v);
		// Displaying the data for the single panel and multiplying it for the number of square meters of solar panels
		$('#kw-available').text(totalKw + " W/m^2 " + "You have a total of " + sqrm + " square meters of panels, wich means you're pv plant is producing  " + (totalKw * sqrm) + " W");
		// Showing the data to the user
		$('.actuals').removeClass('hidden');
	}	
} // end lfc

}); // end document ready function






























