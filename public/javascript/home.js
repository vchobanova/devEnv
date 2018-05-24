// Wait for the DOM to be ready
$(function() {

    $.get( '/movie' , function( data ){
    }).done(function( data ) {
        // TO DO ON DONE
        //console.log("data: ", data);
        //console.log("Success");
        showMovies(data);

    }).fail(function(data, textStatus, xhr) {
        //This shows status code eg. 403
        //console.log("error", data.status);
        //This shows status message eg. Forbidden
        //console.log("STATUS: "+xhr);
    }).always(function() {
        //TO-DO after fail/done request.
        //console.log("ended");
    });
});

function showMovies(data) {
    var htmlMovies = "";
    var htmlMovie = "";
console.log("data: ", data);
    $("#lblMovieList").html("");

    for (var i = 0; i < data.length; i++) {
        htmlMovie =   '<div class="movie-card">\
                                <div class="movie-header">\
                                    <div class="header-icon-container">\
                                    <a href="#">\
                                       <i class="material-icons header-icon"></i>\
                                       </a>\
                                       </div>\
                                        </div>\
                                       <div class="movie-content">\
                                       <div class="movie-content-header">\
                                       <a href="#">\
                                       <h3 class="movie-title">Man of Steel</h3>\
                                       </a>\
                                       <div class="imax-logo"></div>\
                                       </div>\
                                       </div>\
                                       </div>';
        htmlMovies += htmlMovie;
    }
    
    $("#lblMovieList").html(htmlMovies);
}
