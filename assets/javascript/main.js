// Array of predefined GIF search terms
var ranArray = ["Applause", "Facepalm", "Happy Dance", "Crying", "Angry", "Eye Roll", "Facepalm", "Hi", "Crying", "Tired", "No", "Sad", "Hair Flip", "Bet", "Great Job"];
var buttonColors = ["#4DA3FF", "#FF99A8", "#4DD9A3", "#ffd633", "#9B6BFF"];

// Shuffle function (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

$(document).ready(function () {
    // Shuffle the array each time the page loads
    ranArray = shuffle(ranArray).slice(0, 5);

    for (var i = 0; i < ranArray.length; i++) {
        $("#rando-buttons").append(
            "<button type='button' onclick='searchGif(\"" + ranArray[i] + "\")' class='btn' " +
            "style='background-color: " + buttonColors[i % buttonColors.length] + "; border-color: " + buttonColors[i % buttonColors.length] +
            "; color: #1a1a1a;' value='" + ranArray[i] + "'>" + ranArray[i] + "</button>"
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
    const heroGifContainer = document.getElementById('hero-gif');
    if (!heroGifContainer) {
        
        return;
    }

    fetch('/api/hero')
        .then(res => {
            if (!res.ok) throw new Error("Fetch failed with status " + res.status);
            return res.json();
        })
        .then(data => {
            
            const gifUrl = data.data.images.original.url;
            heroGifContainer.style.backgroundImage = `url('${gifUrl}')`;
        })
        .catch(err => {
            
        });
}

// Function to load and display trending GIFs
function loadTrendingGifs() {
  fetch('/api/trending')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('trending-gifs');
      if (!container) return;

      const gifs = data.data.slice(0, 5); // Limit to 5
      gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.className = 'm-2';
        img.style.width = '200px';
        img.style.height = '200px';
        container.appendChild(img);
      });
    })
    
}

document.addEventListener('DOMContentLoaded', () => {
  loadHeroGif();
  loadTrendingGifs();
});
