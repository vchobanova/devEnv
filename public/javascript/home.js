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
    $.get( '/tv-program' , function( data ){
    }).done(function( data ) {
        // TO DO ON DONE
        //console.log("data: ", data);
        //console.log("Success");
        showTv(data);

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
                                <img src="../public/images/posters/'+data[i].poster+'" class="img-fluid img-thumbnail" alt="product">\
                                    <div class="header-icon-container">\
                                       </div>\
                                        </div>\
                                       <div class="movie-content">\
                                       <div class="movie-content-header">\
                                       <a href="/single-video/'+ data[i].video_uid+'">\
                                       <h3 class="movie-title">'+data[i].title+'</h3>\
                                       </a>\
                                       <div class="imax-logo"></div>\
                                       </div>\
                                       </div>\
                                       </div>';
        htmlMovies += htmlMovie;
    }
    
    $("#lblMovieList").html(htmlMovies);
}

function showTv(data) {
    var htmlMovies = "";
    var htmlMovie = "";
console.log("data: ", data);
    $("#lbltvList").html("");

    for (var i = 0; i < data.length; i++) {
        htmlMovie =   '<div class="movie-card">\
                                <div class="movie-header">\
                                <img src="../public/images/posters/'+data[i].poster+'" class="img-fluid img-thumbnail" alt="product">\
                                    <div class="header-icon-container">\
                                       </div>\
                                        </div>\
                                       <div class="movie-content">\
                                       <div class="movie-content-header">\
                                       <a href="/single-video/'+ data[i].video_uid+'">\
                                       <h3 class="movie-title">'+data[i].title+'</h3>\
                                       </a>\
                                       <div class="imax-logo"></div>\
                                       </div>\
                                       </div>\
                                       </div>';
        htmlMovies += htmlMovie;
    }

    $("#lbltvList").html(htmlMovies);
}
