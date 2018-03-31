
$("#add").on("click", function(event) {
    event.preventDefault();

    // make a newUser obj
    var Users = {
      // name from input
      name: $("#name").val().trim(),
      // petName from input
      petName: $("#pet-name").val().trim(),

      // petType from input
      petType: $("#pet-type").val(),
      // photo from input
      photo: $("#upload-image").val(),
      // location from input
      location: $("#location").val().trim(),
      // email from input
      email: $("#email").val().trim(),
      // password from input
      password: $("#password").val().trim(),
    };

    // send an AJAX POST-request with jQuery
    $.post("/api/newUsers", Users)
      // on success, run this callback
      .then(function(data) {
        // log the data we found
        console.log(data);
        // tell the user we're adding a User with an alert window
        alert("Adding User...");
      });

    // empty each input box by replacing the value with an empty string
    $("#name").val("");
    $("#pet-name").val("");
    $("#pet-type").val("");
    $("#location").val("");
    $("#email").val("");
    $("#password").val("");


  });
