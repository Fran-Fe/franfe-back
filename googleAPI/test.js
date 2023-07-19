const chai = require('chai');
const expect = chai.expect;
const mysql = require('mysql2');
const chaiHttp = require('chai-http');
const app = require('./apiTest.js');//app.js가 이미 있어서 apiTest로 몀명함
chai.use(chaiHttp);

describe('Google API Test', function(){
    describe('Connect Success Test', function (){
        it('Server Connected Complete', function(done){
            chai
                .request(app)
                .get('/')
                .end(function(err, res){
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })

});