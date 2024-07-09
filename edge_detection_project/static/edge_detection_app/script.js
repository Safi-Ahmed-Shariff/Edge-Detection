// script.js

$(document).ready(function() {
    $('#uploadForm').on('submit', function(event) {
        event.preventDefault();
        
        // Create FormData object to send file data
        var formData = new FormData(this);
        
        // AJAX request to submit form data
        $.ajax({
            type: 'POST',
            url: '',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                $('#originalImageCard').remove(); // Remove previous original image if exists
                $('#edgesImageCard').remove(); // Remove previous edge-detected image if exists
                $('#uploadForm').hide(); // Hide upload form after submission

                // Append new original image and edge-detected image
                $('.container').append(`
                    <div class="card mt-4" id="originalImageCard">
                        <div class="card-body">
                            <h5 class="card-title">Original Image</h5>
                            <img src="${response.original_image}" alt="Original Image">
                        </div>
                    </div>
                    <div class="card mt-4" id="edgesImageCard">
                        <div class="card-body">
                            <h5 class="card-title">Edge Detected Image</h5>
                            <img src="${response.edges_image}" alt="Edge Detected Image">
                        </div>
                    </div>
                `);
            },
            error: function(error) {
                console.log(error);
                alert('Error uploading image. Please try again.');
            }
        });
    });
});
