import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from "../app.js";
import { resetTestDb } from "./baseTest.js";
import { restGet } from "./restClientFactory.js";

chai.use(chaiHttp);

beforeEach(async () => {
  await resetTestDb();
});

describe('Connect Success Test', function () {
  it('Server Connected Complete', function (done) {
    restGet('/googleMap').end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    })
  });
  it('should fail', function () {
    restGet('/index').end(function (err, res) {
      expect(res).to.have.status(404);
      // done();
    })
  });
});