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

    //get video comments
    $.get( '/movie/' + movieId + "/comments" , function( data ){

    }).done(function( data ) {
        // TO DO ON DONE
        console.log("Success");
        showComments(data);

    }).fail(function(data, textStatus, xhr) {
        //This shows status code eg. 403
        console.log("error", data.status);
        //This shows status message eg. Forbidden
        console.log("STATUS: "+xhr);

    }).always(function() {
        //TO-DO after fail/done request.

        console.log("ended");
    });

    getRating();
});

function showVideo(data) {
  console.log("data: ", data);
    $("#video-container").html("");
    var htmlSingleVideo =   '<h1>'+data[0].title+'</h1>\
                            <div align="center" class="embed-responsive embed-responsive-16by9">\
                                <video controls class="embed-responsive-item">\
                                    <source src="../public/videos/'+data[0].url+'" type="video/mp4">\
                                </video>\
                            </div>';
    $("#video-container").html(htmlSingleVideo);
}

function showComments(data){
console.log("comments data: ", data);

    var htmlComments = "";
    var htmlComment = "";
    $("#comments").html("");

    var loggedUserComment = '<div class="comment-wrap">\
                        <div class="photo">\
                            <div class="avatar" style="background-image: url(https://crimsonems.org/wp-content/uploads/2017/10/profile-placeholder.gif)"></div>\
                        </div>\
                        <div class="comment-block">\
                            <form id="frmComment">\
                                <textarea name="" id="txtComment" cols="30" rows="3" placeholder="Add new comment.."></textarea>\
                                <button id="btnCommentSubmit" class="btn btn-gold my-2 my-sm-0 text-uppercase" type="button">Submit</button>\
                            </form>\
                        </div>\
                    </div>';

    var jData = data;
    for (let i = 0; i < jData.length; i++) {
        var createTime = new Date(jData[i].date_time_posted);
        var locale = "en-us";
        var minutes = createTime.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        var formatDate = createTime.toLocaleString(locale, {month: "long"}) + " " + createTime.getDate() + ", "
            + createTime.getFullYear() + " @ " + createTime.getHours() + ":" + minutes;
        htmlComment =   '<div class="comment-wrap">\
                            <div class="photo">\
                                <div class="avatar" style="background-image: url(https://crimsonems.org/wp-content/uploads/2017/10/profile-placeholder.gif)"></div>\
                            </div>\
                            <div class="comment-block">\
                                <p class="comment-text">' + jData[i].comment +'</p>\
                                <div class="bottom-comment">\
                                <div class="comment-date">' + formatDate +'</div>\
                                <ul class="comment-actions">\
                                    <li class="complain">By ' + jData[i].email + '</li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>';
        htmlComments += htmlComment;
    }
    $("#comments").html(htmlComments);
    $("#comments").prepend(loggedUserComment);
    addComment();
}
function addComment() {
    $("#btnCommentSubmit").click(function() {
        var sCookie = localStorage.getItem("cookie");
        console.log("sCookie: ", sCookie);
        var jCookie = JSON.parse(sCookie);

        var txtComment = $("textarea#txtComment").val();
        var sjComment = {"comment":txtComment,"userNo": jCookie.userNo, "movieId": movieId};
        console.log(sjComment);

        $.post( '/account/comment' , sjComment , function( data ){
        }).done(function(data) {
            // TO DO ON DONE
            console.log("Success");
            console.log("data post comment: ", data);
            var jComment = data;

            var createTime = new Date(jComment[0][0].date_time_posted);
            var locale = "en-us";
            var minutes = createTime.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var formatDate = createTime.toLocaleString(locale, {month: "long"}) + " " + createTime.getDate() + ", "
                + createTime.getFullYear() + " @ " + createTime.getHours() + ":" + minutes;
            //console.log(formatDate);
            var htmlComment =   '<div class="comment-wrap">\
                            <div class="photo">\
                                <div class="avatar" style="background-image: url(https://crimsonems.org/wp-content/uploads/2017/10/profile-placeholder.gif)"></div>\
                            </div>\
                            <div class="comment-block">\
                                <p class="comment-text">' + jComment[0][0].comment +'</p>\
                                <div class="bottom-comment">\
                                <div class="comment-date">' + formatDate +'</div>\
                                <ul class="comment-actions">\
                                    <li class="complain">By ' + jComment[0][0].email + '</li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>';

            $("#comments").append(htmlComment);

        }).fail(function(data, textStatus, xhr) {
            //This shows status code eg. 403
            console.log("error", data.status);
            //This shows status message eg. Forbidden
            console.log("STATUS: "+xhr);

            //var response = JSON.parse(data.responseText);
            console.log("response: ", data.responseText);

        }).always(function() {
            //TO-DO after fail/done request.
            console.log("ended");
        });
    });
}

// ratings 
const ratings = {
    harrypotter: 2.8,
}

const starsTotal = 5;


function getRating() {
    for(let rating in ratings){
        console.log(ratings[rating]);
        const starPercentage = (ratings[rating] / starsTotal * 100);
        console.log(starPercentage);
        const startPercentageRounded = `${Math.round(starPercentage/10)*10}%`;
        console.log(startPercentageRounded)
        document.querySelector(`.${rating} .stars-inner`).style.width = startPercentageRounded;
    }
}

