import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from "../app.js";
import { resetTestDb } from "./baseTest.js";

chai.use(chaiHttp);

beforeEach(() => {
  resetTestDb();
});

describe('Connect Success Test', function () {
  it('Server Connected Complete', function (done) {
    chai.request(app).get('/googleMap').end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    })
  });
  it('should fail', function () {
    chai.request(app).get('/index').end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    })
  });
});