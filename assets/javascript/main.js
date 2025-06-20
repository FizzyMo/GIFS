// Array of predefined GIF search terms
var ranArray = ["Lana Del Rey", "Dogs", "Birds", "Snow", "Ice Cream"];

$(document).ready(function () {
    // Append buttons
    for (var i = 0; i < ranArray.length; i++) {
        $("#rando-buttons").append(
            "<button type='button' onclick='searchGif(\"" + ranArray[i] + "\")' class='btn btn-primary' value='" +
            ranArray[i] + "'>" + ranArray[i] + "</button>"
        );
    }

    // Enter key submits form
    $("#rando-input").on("keypress", function (event) {
        if (event.which === 13) {
            event.preventDefault();
            submitButtonClicked();
        }
    });

    // Load Hero GIF on page load
    loadHeroGif();
});

// Handle form submission
function submitButtonClicked() {
    var userInput = $('#rando-input').val().trim();
    if (userInput !== "") {
        searchGif(userInput);
        $('#rando-input').val('');
    }
}

// Search GIFs via /api/search endpoint
function searchGif(gifName) {
    const searchUrl = '/api/search?q=' + encodeURIComponent(gifName) + '&limit=20';

    $.ajax({
        url: searchUrl,
        type: 'GET'
    })
        .done(function (response) {
            displayGif(response);
        })
        .fail(function (error) {
            $('#random').html('<p class="text-danger">Error fetching GIFs: ' + error.status + ' ' + error.statusText + '</p>');
        });
}

// Display GIFs on the page
function displayGif(response) {
    $('#random').empty();

    const gifs = response.data.slice(0, 20);
    for (var i = 0; i < gifs.length; i++) {
        var image = '<img src="' + gifs[i].images.fixed_height_still.url +
            '" data-still="' + gifs[i].images.fixed_height_still.url +
            '" data-animate="' + gifs[i].images.fixed_height.url +
            '" data-state="still" class="movImage">';
        $('#random').append('<div class="col-md-3">' + image + '</div>');
    }

    // Toggle GIF animation
    $('.movImage').on('click', function () {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }
    });
}

// Load hero GIF background
function loadHeroGif() {
    console.log("Running loadHeroGif");

    const heroGifContainer = document.getElementById('hero-gif');
    if (!heroGifContainer) {
        console.warn("Hero container not found in DOM");
        return;
    }

    fetch('/api/hero')
        .then(res => {
            if (!res.ok) throw new Error("Fetch failed with status " + res.status);
            return res.json();
        })
        .then(data => {
            console.log("Hero GIF data received:", data);
            const gifUrl = data.data.images.original.url;
            heroGifContainer.style.backgroundImage = `url('${gifUrl}')`;
        })
        .catch(err => {
            console.error('Failed to load hero gif', err);
        });
}
