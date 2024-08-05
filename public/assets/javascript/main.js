// Array of predefined GIF search terms
var ranArray = ["Lana Del Rey", "Dogs", "Birds", "Snow", "Ice Cream"];

$(document).ready(function () {
    for (var i = 0; i < ranArray.length; i++) {
        $("#rando-buttons").append("<button type='button' onclick='searchGif(\"" + ranArray[i] + "\")' class='btn btn-primary' value=' "
            + ranArray[i] + "'> " + ranArray[i] + " </button>");
    }

    $("#rando-input").on("keypress", function(event) {
        if (event.which === 13) { 
            event.preventDefault(); 
            submitButtonClicked(); 
        }
    });
});

// Function to handle clicks on random input buttons
function randoButtonClicked() {
    var userInput = $('#rando-input').val();
    userInput.preventDefault();

    // Trigger GIF search with user input
    searchGif(userInput);
}

// Function to handle form submission
function submitButtonClicked() {
    // Trim input
    var userInput = $('#rando-input').val().trim(); 

    // Check for non-empty input
    if (userInput !== "") { 
        // Search for GIFs
        searchGif(userInput);  

        // Clear the input field 
        $('#rando-input').val(''); 
    }
}

// Function to perform AJAX request to search for GIFs
function searchGif(gifName) {
    const searchUrl = '/api/search?q=' + encodeURIComponent(gifName) + '&limit=20';
    
    $.ajax({
        // Request URL with user input
        url: searchUrl,
        

        // GET method for retrieving data
        type: 'GET',
    })
    
    .done(function (response) {
        // Display GIFs if request is successful
        displayGif(response);
        
    })
    .fail(function () {
        // If request fails show error message to user
        $('#random').html('<p class="text-danger">Error fetching GIFs. Please try again later.</p>'); // Show error message to user
    });
    
}


// Function to display GIFs on the page
function displayGif(response) {
    // Clear any existing GIFs
    $('#random').empty();

    // Limit to 20 GIFs
    const gifs = response.data.slice(0,20);
    for (var i = 0; i < gifs.length; i++) {
        // Create image element
        var image = '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage"';

        image = '<div class="col-md-3">' + image + "</div>";

        // Append image to the container
        $('#random').append(image);
    }

    // Event handler for clicking on GIFs to toggle animation
    $('.movImage').on('click', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            // Change to animated GIF
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            // Change to still GIF
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}
