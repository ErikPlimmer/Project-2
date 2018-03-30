// JS for survey page for capturing the survey data and posting to the server

// Chosen CSS
var config = {
	'.chosen-select'           : {},
	'.chosen-select-deselect'  : {allow_single_deselect:true},
	'.chosen-select-no-single' : {disable_search_threshold:10},
	'.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
	'.chosen-select-width'     : {width:"95%"}
}

for (var selector in config) {
	$(selector).chosen(config[selector]);
}

// Capture the form inputs
$("#submit").on("click", function(){

	// Form validation
	function validateForm() {
		var isValid = true;
		$('.form-control').each(function() {
		if ( $(this).val() === '' )
			isValid = false;
		});

		$('.chosen-select').each(function() {

	  	if( $(this).val() === "")
	  		isValid = false
		});

		return isValid;
	}

	// If all required fields are filled
	if (validateForm() == true)
	{
		// Create an object for the user's data
    	var userData = {
    	scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(), ]
    	}

    	// Grab the URL of the website
    	var currentURL = window.location.origin;

    	// AJAX post the data to the pets API.
    	$.post(currentURL + "/api/newPet", userData, function(data){

    		// Grab the result from the AJAX post so that the best match's name and photo are displayed.
    		$("#matchName").text(data.name);
    		$('#matchImg').attr("src", data.photo);
    		$('#matchDescription').text(data.description);

	    	// Show the modal with the best match 
	    	$("#resultsModal").modal('toggle');

			// User Name Display in modal popup

	    	var userName = $("#name").val().trim();;
            var welcome = $("<h3>").html("Welcome " + userName);
            $("#welcome").html(welcome);

    	});
	}
	else
	{
		alert("Please fill out all fields before submitting!");
	}

	return false;
});
