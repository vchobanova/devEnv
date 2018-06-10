$("#btnSearch").click(function() {
    var searchValue = $("#txtSearchVid").val();
   $.get("/tv-program/search/" + searchValue, function(data){

   }).done(function(data) {
        showResults(data);
   }).fail(function(data){
    $.get( '/tv-program' , function( data ){
    }).done(function( data ) {
        // TO DO ON DONE
        //console.log("data: ", data);
        //console.log("Success");
        showResults(data);

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
});



function showResults(data) {
    if(data.length > 0){
        console.log("found movies" + data);
        var htmlMovies = "";
        var htmlMovie = "";
        console.log("data: ", data);
        $("#lblMovieList").html("");
    
        for (var i = 0; i < data.length; i++) {
            htmlMovie =   '<div class="movie-card">\
                                <div class="movie-header" data-id="' + data[i].video_uid +'">\
                                    <div class="header-icon-container">\
                                        <a href="#">\
                                        <i class="material-icons header-icon"></i>\
                                        </a>\
                                    </div>\
                                </div>\
                                <div class="movie-content">\
                                    <div class="movie-content-header">\
                                        <a href="#">\
                                        <h3 class="movie-title">' + data[i].title + '</h3>\
                                        </a>\
                                    </div>\
                                    <div class="movie-info">\
                                        <div class="info-section year">\
                                            <label>Year</label>\
                                            <span>' + data[i].year_of_production + '</span>\
                                        </div>\
                                        <div class="info-section">\
                                            <label>Genre</label>\
                                            <span>' + data[i].genre + '</span>\
                                        </div>\
                                        <div class="info-section rating">\
                                            <label>Rating</label>\
                                            <span>' + data[i].rating + '</span>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>';
            
            htmlMovies += htmlMovie;
           
        }
        
        $("#lblMovieList").html(htmlMovies);
    
        $(".movie-header").each(function(i){
            var video_uid = $(this).attr("data-id");
            for (let x = 0; x < data.length; x++) {
                if(video_uid == data[x].video_uid){
                $(this).css("background-image", "url(../public/images/posters/" + data[x].poster + ")");
                }
            }
        });
        $("#btnTitleAsc").click(function() {
            var $divs = $("div.movie-card")
            var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
                return $(a).find("h3").text() > $(b).find("h3").text();
            });
            $("#lblMovieList").html(alphabeticallyOrderedDivs);
        });

        $("#btnTitleDesc").click(function() {
            var $divs = $("div.movie-card")
            var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
                return $(a).find("h3").text() < $(b).find("h3").text();
            });
            $("#lblMovieList").html(alphabeticallyOrderedDivs);
        });
        
        
        $("#btnRating").click(function() {
            var $divs = $("div.movie-card")
            var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
                return $(a).find(".rating span").text() < $(b).find(".rating span").text();
            });
            $("#lblMovieList").html(alphabeticallyOrderedDivs);
        });

            
        $("#btnYear").click(function() {
            var $divs = $("div.movie-card")
            var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
                return $(a).find(".year span").text() < $(b).find(".year span").text();
            });
            $("#lblMovieList").html(alphabeticallyOrderedDivs);
        });
    } else {
        var sNotFount = "<p>Sorry, we could not find anything with what you searched for! :(</p>"
        $("#lblMovieList").html(sNotFount);
    }
    
   
}