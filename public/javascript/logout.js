$("#btnLogOut").click(function() {
    $.get("/account/logout", function() {

    }).done(function(data){
        window.location.href = "/";
        localStorage.clear();
    }).fail(function(data){
        console.log(data);
    });
});