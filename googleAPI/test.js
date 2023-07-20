import chai from "chai";

const expect = chai.expect;
const mysql = require('mysql2');
const chaiHttp = require('chai-http');
const app = require('./getAPI.js');
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