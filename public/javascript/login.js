$('#loginbtn').click(function(){
  var data = $('#form-signin').serialize();
  console.log(data)
  $.post('/account/login', data).done(function(){
    console.log('User found')
    window.location.href = "/home";
  })
})

