// Wait for the DOM to be ready
$(function() {
    $.get( '/account/profile' , function( data ){
    }).done(function( data ) {
        // TO DO ON DONE
        //console.log("data: ", data);
        //console.log("Success");
        console.log(data)
        showUser(data);
    }).fail(function(data, textStatus, xhr) {
        //This shows status code eg. 403
        //console.log("error", data.status);
        //This shows status message eg. Forbidden
        //console.log("STATUS: "+xhr);
    }).always(function(data) {
        console.log(data);
        //TO-DO after fail/done request.
        //console.log("ended");
    });
});

function showUser(data) {
    var htmlUserSection = "";
    var htmlUser="";
    var userImage;
    
    if(data[0].image != null && data[0].image != ""){
        userImage = "../public/images/uploads/" + data[0].image;
    } else {
        userImage = "../public/images/uploads/defaultIcon.png";
    }
    console.log(userImage)
    $("#lblProfileSection").html("");
    htmlUser =   '<div class="row">\
                                <div class="col-sm">\
                                    <div class="name">\
                                        <div class="font-weight-bold"><i class="fa fa-user"></i>Name</div>\
                                        <div>'+data[0].name+'</div>\
                                    </div>\
                                    <div class="email">\
                                        <div class="font-weight-bold"><i class="fa fa-at"></i>Email</div>\
                                        <div>'+data[0].email+'</div>\
                                    </div>\
                                </div>\
                            </div>';
    htmlUserSection = htmlUser;
    $("#lblProfileSection").html(htmlUserSection);

}

$("#profile-link").click(function() {
    window.location.replace("/profile");  
});


checkSession();