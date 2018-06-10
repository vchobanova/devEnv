$('#loginbtn').click(function(){

  var frm = $("#frmLogin");
  var oFrm = frm.serialize();
  console.log(oFrm );

  $.post("/account/login", oFrm, function(data){
    console.log(data);
  }).done(function(data){
    console.log("data: ", data);
      localStorage.setItem("cookie", data);
      window.location.href = "/home";
  }).fail(function(data){
      console.log(data);
  });
  
});
