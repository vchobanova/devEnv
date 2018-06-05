var url = window.location.href;
var movieId = url.substring(url.lastIndexOf('/') + 1);

// Wait for the DOM to be ready
$(function() {

    //get video
    $.get( '/movie/' + movieId , function( data ){

    }).done(function( data ) {
        // TO DO ON DONE

        //console.log("Success");
        showVideo(data);
    }).fail(function(data, textStatus, xhr) {
        //This shows status code eg. 403
        //console.log("error", data.status);
        //This shows status message eg. Forbidden
        //console.log("STATUS: "+xhr);

    }).always(function() {
        //TO-DO after fail/done request.

        // console.log("ended");
    });
});

function showVideo(data) {
  console.log("data: ", data);
    $("#video-container").html("");
    var htmlSingleVideo =   '<div class="card" style="width: 30rem; height: 50rem;">\
                                <img class="card-img-top" src="http://via.placeholder.com/450x350" alt="Card image cap">\
                             </div>';
    $("#video-container").html(htmlSingleVideo);
}