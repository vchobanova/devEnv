console.log('hi')

$('#btnRegisterUser').click(function(){
  var data = $('#form-register').serialize();
  console.log(data)
  $.post('/account/register', data);
})