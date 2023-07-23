import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import { resetTestDb } from "./baseTest.js";
import { restGet } from "./restClientFactory.js";

chai.use(chaiHttp);

beforeEach(async () => {
  await resetTestDb();
});

describe('Connect Success Test', function () {
  it('Server Connected Complete', function (done) {
    restGet('/cafe-rankings').end(function (err, res) {

      expect(res).to.have.status(200);
      done();
    })
  });
});