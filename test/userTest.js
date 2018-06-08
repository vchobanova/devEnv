const assert = require('chai').assert;
const request = require('supertest')('http://localhost:8080');

describe('User testing', function(){
  describe('Register process of users', function(){

    it('Should Register a user', function(done){
      let user = { email :'test@test.dk', name:'testman', password:'1234'}
    
      request
      .post('/account/register')
      .send(user)
      .expect(200, done);
    });

    it('Should give error if no data send', function(done){
      let user = { email :'', name:'',}
      
      request
      .post('/account/register')
      .send(user)
      .expect(500, done);
    });
  })
  
  describe('Login process of users', function(){

    it('Should login a user', function(done){
      let loginUser = { email :'test@sadasdastest.dk', password:'1234'}
      
      request
      .post('/account/login')
      .send(loginUser)
      .expect(200, done);
    });
    
    it('Should give error if user not excist', function(done){
      let loginUser = { email :'no@USERtest.dk', password:'123123123'}
      
      request
      .post('/account/login')
      .send(loginUser)
      .expect(401, done);
    });
    
  })
})