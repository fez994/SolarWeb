$(document).ready(function(){

// Hiding the data div to display it later
$('.plant').hide();

// Arrow Scroll on click
$("#arrow").click(function() {
    $('html, body').animate({
        scrollTop: $("#myDiv").offset().top
    }, 2000);
});


// Dropdown Menu
 window.run = function() {
 	var myselect = document.getElementById("dropdown-menu");
 	// Type of pv
 	window.g = (myselect.options[myselect.selectedIndex].value);
 	// Performance percentage
 	window.n = (myselect.options[myselect.selectedIndex].getAttribute('data-value'));
 	// Performance percentage divided by 100, so if performance 16%  => 0.16
 	window.v = (myselect.options[myselect.selectedIndex].getAttribute('title'));
 
 }


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
			// Air temperature
			var airTemp = contents.forecasts[0].air_temp
			useData(ghi, airTemp);
		})
		.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
	}

	// Displaying Data
	function useData(ghi, airTemp) {
		// Total Value of the Irradiance
		var sum = ghi;
		// Getting the data of how many m^2 of panel the user have
		var panels = $('#sqrm').serializeArray();
		var sqrm = document.getElementById("sqrm").value;
		// Displaying type of pv
		$('#pv_type').text(g + ".");
		// Displaying performance in % of the pv
		$('#performance').text(" is " + n);
		// Displaying the total irradiance value
		$('#irradiance-data').text(sum + " W/m^2 ");
		// Total irradiance * performance of the panel to get how much a single panel is producing
		var totalKw = Math.round(sum * v);
		// Displaying the data for the single panel and multiplying it for the number of square meters of solar panels
		$('#kw-available').text(totalKw + " W/m^2 " + "You have a total of " + sqrm + " square meters of panels, wich means your pv plant is producing  " + (totalKw * sqrm) + " W");
		// Displaying air temp data 
		$('#air-temp').text(airTemp);
		// Showing the data to the user
		$('.actuals').removeClass('hidden');
		// smooth scroll to show the results div
		$('html, body').animate({
        scrollTop: $("#results").offset().top
    	}, 2000);
	}	

} // end lfc

}); // end document ready function






























