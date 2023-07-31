import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import { resetTestDb } from "./baseTest.js";
import { restGet } from "./restClientFactory.js";
import { getAllCafesResponseAssert } from "./assertionFactory.js";

chai.use(chaiHttp);

beforeEach(async () => {
  await resetTestDb();
});

describe('getAllCafes Connect Success Test', function () {
  it('Server Connected Complete', function (done) {
    restGet('/cafes').end(function (err, res) {

      getAllCafesResponseAssert(res);
      expect(res.body[0].uuid).equal('abc');
      expect(res.body[0].address).equal('aa');
      expect(res.body[0].placeName).equal('11111');
      done();
    })
  });
});

describe('getPhotos of each Cafe Connect Success Test', function () {
  it('', function (err, res) {
    restGet('/cafes/photos').end(function (err, res) {


    })

  });
});